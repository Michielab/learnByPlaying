import React, { Component } from "react";
import NoteLine from "./NoteLine";
import Note from "./Note";
import Gsleutel from "../Gsleutel.jpg";
import Api from "../utils/Api";

class Stave extends Component {
  constructor(props) {
    super(props);
    this.state = { note: "", gameStarted: false };
  }
  nextNote = notes => {
    let position = [240, 250];
    let number = Math.floor(Math.random() * notes.length);
    let xAs = 40 * number;
    let yAs = 12.5 * number;
    let note = notes[number];
    position = [160 + xAs, 250 - yAs];
    note.position = position;
    this.setState({ note });
  };

  getInfo = () => {
    Api.Api();
    // Api.then(function(test) {
    //   console.log("test", test)dd;
    // });
  };

  startGame = notes => {
    this.nextNote(notes);
  };

  startGame2 = notes => {
    this.nextNote(notes);
  };

  render() {
    const vertices = [
      [[50, 125], [800, 125]],
      [[50, 150], [800, 150]],
      [[50, 175], [800, 175]],
      [[50, 200], [800, 200]],
      [[50, 225], [800, 225]]
    ];

    const notes = [
      { name: "C", line: true },
      { name: "D" },
      { name: "E" },
      { name: "F" },
      { name: "G" },
      { name: "A" },
      { name: "B" },
      { name: "C" },
      { name: "D" },
      { name: "E" },
      { name: "F" },
      { name: "G" },
      { name: "A", line: true }
    ];

    const { note } = this.state;
    return (
      <div className="stave">
        <svg height="100%" width="100%">
          <image href={Gsleutel} x="5" y="48" height="250px" width="180px" />
          {vertices.map((vertice, index) => (
            <NoteLine key={index} vertices={vertice} />
          ))}
          {note !== "" ? (
            <Note
              cx={note.position[0]}
              cy={note.position[1]}
              line={note.line}
            />
          ) : (
            ""
          )}n
        </svg>
        <div className="button-container">
          {notes.map(
            (note, index) =>
              index < 7 ? (
                <button className="button-notes" onClick={() => this.getInfo()}>
                  {note.name}
                </button>
              ) : (
                ""
              )
          )}
        </div>
      </div>
    );
  }
}

export default Stave;
