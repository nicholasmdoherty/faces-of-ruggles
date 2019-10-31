import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import $ from "jquery";
import autoBind from "react-autobind";

export default class Control extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promptId: 1
    };

    autoBind(this);
  }

  handleChange(event) {
    this.setState({ promptId: event.target.value });
  }

  handleSubmit() {
    $.ajax({
      method: "POST",
      url: "/change-prompt",
      data: {
        prompt_id: this.state.promptId
      }
    }).then(response => {
      window.location.pathname = "";
    });
  }

  render() {
    return (
      <div className="p-3">
        <h2 className="m-2">Select the prompt to change to:</h2>
        <div className="w-25">
          <Form.Control
            className="m-2"
            as="select"
            onChange={this.handleChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Form.Control>
          <Button className="m-2" onClick={this.handleSubmit}>
            Change Prompt
          </Button>
        </div>
      </div>
    );
  }
}
