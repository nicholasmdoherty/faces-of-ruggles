import React, { Component } from "react";
export default class ReplySection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberColorMapping: {}
    };
  }

  render() {
    return (
      <div className="reply-column">
        <div className="p-3">
          <h1> DEAR RUGGLES, </h1>
          <h2> {this.props.question} </h2>
          <hr />
        </div>
        <div className="p-3 replies-section">
          {this.props.replies.map((reply, index) => {
            if (index % 2 == 0) {
              return (
                <div className="m-3 text-right justify-right">
                  <div className="text-bubble-right">
                    <p className="m-0">{reply.answer}</p>
                  </div>
                  <p className="mb-0 ml-2">{reply.texted_from}</p>
                </div>
              );
            } else {
              return (
                <div className="m-3">
                  <div className="text-bubble-left">
                    <p className="m-0">{reply.answer}</p>
                  </div>
                  <p className="mb-0 ml-2">{reply.texted_from}</p>
                </div>
              );
            }
          })}
        </div>
        <div className="p-3">
          <h3 className="lead">
            {" "}
            <strong>We want to hear your thoughts!</strong>
            <br />
            Shoot us a text at <strong>(617)-393-5175</strong> with an answer
            for your idea to be featured.{" "}
          </h3>
        </div>
      </div>
    );
  }
}
