import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Import start point  */
import { startPointX } from '~/components/notes/Notes';

class HalfNote extends Component {
  coords;
  state = {
    positionX: this.props.positionX,
    positionY: this.props.positionY
  };

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseDown = e => {
    this.coords = {
      x: e.pageX,
      y: e.pageY
    };
    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    const { positionX, positionY } = this.state;
    const exactNote = this.getExactNote(positionY);
    const exactPositionX = this.getCorrectXposition(positionX);
    const newId = this.setIdNote();

    let note = {
      ...exactNote,
      positionY: exactNote.positionY,
      positionX: exactPositionX,
      id: newId,
      duration: this.props.duration
    };

    this.props.addNote(note);

    if (this.props.indentify === 'basicNote') {
      this.setState({ positionX: 200, positionY: this.props.height - 20 });
    }

    this.coords = {};

    setTimeout(() => {
      this.setState({
        positionX: this.props.positionX,
        positionY: this.props.positionY
      });
    }, 100);
  };

  handleMouseMove = e => {
    const xDiff = this.coords.x - e.pageX;
    const yDiff = this.coords.y - e.pageY;

    this.coords.x = e.pageX;
    this.coords.y = e.pageY;

    this.setState({
      positionX: this.state.positionX - xDiff,
      positionY: this.state.positionY - yDiff
    });
  };

  setIdNote = () => {
    const { id, composedNotes } = this.props;
    if (composedNotes.map(note => note.id).indexOf(id) !== -1) {
      return id;
    } else {
      return id + composedNotes.length;
    }
  };

  getExactNote = y => {
    const { standardNotes } = this.props;
    let placedNote =
      y > standardNotes[0].positionY
        ? standardNotes[0]
        : y < standardNotes[standardNotes.length - 1].positionY
        ? standardNotes[standardNotes.length - 1]
        : standardNotes.filter(
            note =>
              y < note.positionY + 6.25 && y >= note.positionY - 6.25 && note
          )[0];
    return placedNote;
  };

  getCorrectXposition = x => {
    const { composedNotes, id, width } = this.props;
    startPointX;
    x < startPointX && (x = startPointX);
    x > width - 50 && (x = width - 30);
    composedNotes
      .filter(el => el.id !== id)
      .map(note => {
        x > note.positionX - 48 &&
          x <= note.positionX &&
          (x = note.positionX - 50);
        x <= note.positionX + 48 &&
          x >= note.positionX &&
          (x = note.positionX + 50);
      });

    return x;
  };

  render() {
    const { positionX, positionY } = this.state;
    return (
      <svg>
        <ellipse
          cx={positionX}
          cy={positionY}
          rx="15"
          ry="10"
          stroke="black"
          fill="transparent"
          strokeWidth="3"
          style={{ cursor: 'pointer' }}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
        <line
          x1={positionX + 15}
          y1={positionY - 40}
          x2={positionX + 15}
          y2={positionY}
          strokeWidth="3"
          stroke="black"
        />

        {this.props.line === true && (
          <line
            x1={positionX - 20}
            y1={positionY}
            x2={positionX + 20}
            y2={positionY}
            strokeWidth="3"
            stroke="black"
          />
        )}
      </svg>
    );
  }
}

HalfNote.propTypes = {
  addNote: PropTypes.func,
  id: PropTypes.string,
  standardNotes: PropTypes.array,
  positionX: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

export default HalfNote;
