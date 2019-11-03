import os
import sqlite3
from flask import Flask, request, g, jsonify, render_template
from twilio.twiml.messaging_response import MessagingResponse
from profanity_check import predict
import secrets

app = Flask(__name__, static_folder='./public')
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    SECRET_KEY=secrets.DATABASE_KEY,
    USERNAME=secrets.DATABASE_USERNAME,
    PASSWORD=secrets.DATABASE_PASSWORD
))

###################################################
# FLASK APP FUNCTIONS
###################################################


@app.route("/reply", methods=['GET', 'POST'])
def question_reply():
    """ Take in a reply from someone adding to the installation. """

    # Get the reply message for the prompt on the screen
    message_body = request.values.get('Body')
    message_number = request.values.get('From')

    """ We want to do a quick check for profanity, and let them know
    if we aren't taking the response.
    """

    # If this message is profane, we don't want to add it
    if predict([message_body])[0] == 1:
        resp = MessagingResponse()
        resp.message(
            "Thanks for your reply! Your message has been found to be potentially offensive, so it will not show up")

        return str(resp)

    # If this message is not profane, we want to add it to the DB
    db = get_db()
    cursor = db.cursor()

    # Insert into replies table
    cursor.execute('insert into replies (question_id, texted_from, reply) values (?, ?, ?)', [
                   get_current_prompt_id(), message_number, message_body])

    db.commit()
    cursor.close()

    # Write our response.
    resp = MessagingResponse()
    resp.message("Thanks for your response! You should see it online soon.")

    return str(resp)


@app.route("/control", methods=['GET'])
def control_view():
    """ Render the index page for React UI / Routing """
    return render_template('index.html')


@app.route("/", methods=['GET'])
def installation_view():
    """ Render the index page for React UI / Routing """
    return render_template('index.html')


@app.route("/prompt", methods=['GET'])
def get_current_prompt_info():
    """ Returns the current prompt (id, question, image name) and the 
    replies that go along with the question. Used for the React frontend 
    to get all the data about the current prompt.
    """

    db = get_db()
    cursor = db.cursor()

    # Select the prompt from the DB where the id is the global prompt id
    cursor.execute("select * from prompts where currently_showing = 1")
    prompt = cursor.fetchall()[0]

    if not prompt:
        raise Exception("Prompt not found, this is a server issue.", 500)

    # Select all replies from the DB that where the question_id is the
    # global prompt id
    cursor.execute(
        'select * from replies where question_id = ?', [prompt['id']])
    replies_sql = cursor.fetchall()

    replies = []
    for reply_row in replies_sql:
        reply = {}
        reply['id'] = reply_row["id"]
        reply['texted_from'] = reply_row["texted_from"]
        reply['answer'] = reply_row["reply"]
        replies.append(reply)

    prompt_response = {
        'prompt': prompt["question"],
        'image_file_name': prompt['image'],
        'quote': prompt['quote'],
        'replies': replies
    }

    cursor.close()

    return jsonify(prompt_response)


@app.route("/change-prompt", methods=['POST'])
def change_current_prompt():
    new_prompt_id = request.values.get('prompt_id')
    db = get_db()
    cursor = db.cursor()

    # Set the currently showing to 0
    cursor.execute(
        f"UPDATE prompts SET currently_showing = 0 WHERE currently_showing = 1")

    # Set the given prompt id to currently showing
    cursor.execute(
        f"UPDATE prompts SET currently_showing = 1 WHERE id = {new_prompt_id}")

    db.commit()
    cursor.close()
    return jsonify({'new_prompt': new_prompt_id})


def get_current_prompt_id():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("select * from prompts where currently_showing = 1")
    prompt = cursor.fetchall()[0]

    db.commit()
    cursor.close()
    return prompt['id']


###################################################
# DATABASE FUNCTIONS
###################################################


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()


def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')


if __name__ == "__main__":
    app.run(debug=True)
