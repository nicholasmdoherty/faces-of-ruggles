import React, { Component } from "react";

export default class QuoteSection extends Component {
  render() {
    return (
      <div
        className="quote-column"
        style={{
          backgroundImage: `url(/public/${this.props.imageFile})`,
          backgroundPosition: "center"
        }}
      >
        <h2 className="text-white">{this.props.quote}</h2>
      </div>
    );
  }
}
