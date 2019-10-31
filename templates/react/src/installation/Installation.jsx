import React, { Component } from "react";
import $ from "jquery";
import autoBind from "react-autobind";
import { Container, Row, Col } from "react-bootstrap";
import "./installation.css";
import QuoteSection from "./subcomponents/QuoteSection";
import ReplySection from "./subcomponents/ReplySection";

export default class Installation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prompt: null,
      error: null
    };

    autoBind(this);
  }

  componentDidMount() {
    try {
      setInterval(async () => {
        this.loadPromptInfo();
      }, 10000);
    } catch (e) {
      console.error(e);
    }

    this.loadPromptInfo();
  }

  loadPromptInfo() {
    $.ajax({
      method: "GET",
      url: "/prompt"
    }).then(
      response => {
        this.setState({ prompt: response, error: null });
      },
      error => {
        this.setState({ prompt: null, error });
      }
    );
  }

  render() {
    if (!this.state.prompt) return null;
    if (this.state.error) return <h2> Error! </h2>;

    return (
      <Container fluid>
        <Row className="installation-wrapper">
          <Col xs={7}>
            <ReplySection
              question={this.state.prompt.prompt}
              replies={this.state.prompt.replies}
            />
          </Col>
          <Col xs={5}>
            <QuoteSection
              quote={this.state.prompt.quote}
              imageFile={this.state.prompt.image_file_name}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
