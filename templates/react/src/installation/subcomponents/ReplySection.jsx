import React, { Component } from "react";

export default class ReplySection extends Component {
  render() {
    return (
      <div className="reply-column">
        <div className="p-3">
          <h1> IDEAS OF RUGGLES </h1>
          <hr />
          <h2> {this.props.question} </h2>
        </div>
        <div className="p-3 replies-section">
          {this.props.replies.map(reply => {
            return (
              <div className="m-3">
                <div className="bg-primary text-bubble">
                  <p className="m-0">{reply.answer}</p>
                </div>
                <p className="mb-0 ml-2">{reply.texted_from}</p>
              </div>
            );
          })}
        </div>
        <div className="p-3">
          <h3 className="lead">
            {" "}
            <strong>Want to add a reply?</strong> Text (617)-393-5175 with an
            answer for your idea to be featured.{" "}
          </h3>
        </div>
      </div>
    );
  }
}
