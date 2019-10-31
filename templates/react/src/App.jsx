import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Installation from "./installation/Installation";
import Control from "./Control";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Installation} />
        <Route exact path="/control" component={Control} />
      </Router>
    );
  }
}
