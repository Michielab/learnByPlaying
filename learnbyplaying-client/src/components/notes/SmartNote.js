import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Import start point  */
import { startPointX } from '~/components/notes/Notes';

const noteWrapper = WrappedComponent =>
  class SmartNote extends Component {
    coords;
    state = {
      positionX: this.props.positionX,
      positionY: this.props.positionY
    };

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.positionX !== this.props.positionX ||
        prevProps.positionY !== this.props.positionY
      ) {
        this.setState({
          positionX: this.props.positionX,
          positionY: this.props.positionY
        });
      }
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
      const { duration, height, indentify } = this.props;
      const exactNote = this.getExactNote(positionY);
      const exactPositionX = this.getCorrectXposition(positionX);
      const newId = this.setIdNote();

      let note = {
        ...exactNote,
        positionY: exactNote.positionY,
        positionX: exactPositionX,
        id: newId,
        duration
      };

      this.props.addNote(note);

      indentify === 'basicNote' &&
        this.setState({ positionX: 200, positionY: height - 20 });

      this.coords = {};

      this.setState({
        positionX: this.props.positionX,
        positionY: this.props.positionY
      });
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
      const { id, composedNotes = [] } = this.props;
      let newId =
        composedNotes && composedNotes.map(note => note.id).indexOf(id) !== -1
          ? id
          : id + composedNotes.length;
      return newId;
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
      const { composedNotes = [], id, width } = this.props;
      startPointX;
      x < startPointX && (x = startPointX);
      x > width - 50 && (x = width - 30);
      composedNotes &&
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
      const { handleContextMenu, id } = this.props;
      return (
        <svg>
          <WrappedComponent
            {...this.state}
            handleContextMenu={handleContextMenu}
            id={id}
            handleMouseDown={this.handleMouseDown}
            handleMouseUp={this.handleMouseUp}
          />
          {this.props.line === true && (
            <line
              x1={positionX - 20}
              y1={positionY}
              x2={positionX + 20}
              y2={positionY}
              strokeWidth="3"
              stroke="black"
              onContextMenu={e => {
                handleContextMenu(id);
                e.preventDefault();
              }}
            />
          )}
        </svg>
      );
    }
  };

noteWrapper.propTypes = {
  duration: PropTypes.number,
  indentify: PropTypes.string,
  positionX: PropTypes.number,
  positionY: PropTypes.object,
  height: PropTypes.number
};

export default noteWrapper;
