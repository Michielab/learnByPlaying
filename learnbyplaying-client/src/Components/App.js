import React, { Component } from "react";
import "../App.css";
import Nav from "./Nav";
import Stave from "./Stave";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="stave-container">
          <Stave />
        </div>
      </div>
    );
  }
}

export default App;
