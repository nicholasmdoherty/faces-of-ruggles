import React, { Component } from "react";

export default class QuoteSection extends Component {
  render() {
    let quoteArray = this.props.quote.split("-");

    return (
      <div
        className="quote-column"
        style={{
          backgroundImage: `url(/public/${this.props.imageFile})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="quote-overlay">
          <h2 className="text-black">{quoteArray[0]}</h2>
          <h2 className="text-black text-right mb-0">-{quoteArray[1]}</h2>
        </div>
      </div>
    );
  }
}
