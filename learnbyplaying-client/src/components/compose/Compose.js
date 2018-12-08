import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

/* Helper function to get notes  */
import { getNotes } from '~/components/notes/Notes';

/* Import Note component  */
import WholeNote from '~/components/notes/WholeNote';
import QuarterNote from '~/components/notes/QuarterNote';
import HalfNote from '~/components/notes/HalfNote';

import PlayNote from '~/components/compose/PlayNote';

const noteComponents = {
  wholeNote: WholeNote,
  halfNote: HalfNote,
  quarterNote: QuarterNote
};

class Compose extends Component {
  coords;
  state = {
    composedNotes: [],
      notes: [
        {
          id: 'wholeNote',
          positionX: 200,
          positionY: this.props.height - 30,
          duration: 2000
        },
        {
          id: 'halfNote',
          positionX: 240,
          positionY: this.props.height - 30,
          duration: 1000
        },
        {
          id: 'quarterNote',
          positionX: 280,
          positionY: this.props.height - 30,
          duration: 500
        }
      ]
  };

  handleMouseUp = ({ id, ...note }) => {
    let notes = this.state.composedNotes;
    notes = notes.filter(note => note.id !== id);
    notes.push({ id, ...note });
    this.setState({ composedNotes: notes });
    this.resetNotes();
  };

  resetNotes = () => {
    this.setState({
      notes: [
        {
          id: 'wholeNote',
          positionX: 200,
          positionY: this.props.height - 30,
          duration: 2000
        },
        {
          id: 'halfNote',
          positionX: 240,
          positionY: this.props.height - 30,
          duration: 1000
        },
        {
          id: 'quarterNote',
          positionX: 280,
          positionY: this.props.height - 30,
          duration: 500
        }
      ]
    });
  };

  render() {
    const { composedNotes } = this.state;
    const { middle, divider, width, session, height } = this.props;
    const standardNotes = getNotes(
      middle,
      divider,
      width,
      session.gameOptions.type
    );
    let count = 0;
    let interval;
    console.log(this.props.session.gameOptions.playing);
    return (
      <React.Fragment>
        {!!composedNotes &&
          composedNotes.map(note => {
            let strippedId = note.id.replace(/[0-9]/g, '');
            const Note = noteComponents[strippedId];
            return (
              <Note
                id={note.id}
                composedNotes={composedNotes}
                standardNotes={standardNotes}
                addNote={this.handleMouseUp}
                positionX={note.positionX}
                positionY={note.positionY}
                height={height}
                width={width}
                line={note.line}
              />
            );
          })}
        {this.state.notes.map(note => {
          const Note = noteComponents[note.id];
          return (
            <Note
              indentify="basicNote"
              duration={note.duration}
              id={note.id}
              composedNotes={composedNotes}
              height={height}
              positionX={note.positionX}
              positionY={note.positionY}
              addNote={this.handleMouseUp}
              standardNotes={standardNotes}
              width={width}
            />
          );
        })}
        {this.props.session.gameOptions.playing && (
          <PlayNote composedNotes={composedNotes} />
        )}
      </React.Fragment>
    );
  }
}

Compose.propTypes = {
  middle: PropTypes.number,
  divider: PropTypes.number,
  width: PropTypes.number,
  session: PropTypes.object,
  height: PropTypes.number
};

export default Compose;
