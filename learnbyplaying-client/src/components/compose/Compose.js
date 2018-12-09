import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Helper function to get notes  */
import { getNotes } from '~/components/notes/Notes';

/* Import Note component  */
import WholeNote from '~/components/notes/WholeNote';
import QuarterNote from '~/components/notes/QuarterNote';
import HalfNote from '~/components/notes/HalfNote';
import PlayNote from '~/components/compose/PlayNote';
import SmartNote from '~/components/notes/SmartNote';

const WholeNoteSmart = SmartNote(WholeNote);
const QuarterNoteSmart = SmartNote(QuarterNote);
const HalfNoteSmart = SmartNote(HalfNote);

const noteComponents = {
  wholeNote: WholeNoteSmart,
  halfNote: HalfNoteSmart,
  quarterNote: QuarterNoteSmart
};

function basicNotes(width, height) {
  return [
    {
      id: 'wholeNote',
      positionX: width / 2 - 80,
      positionY: height - 30,
      duration: 2000
    },
    {
      id: 'halfNote',
      positionX: width / 2,
      positionY: height - 30,
      duration: 1000
    },
    {
      id: 'quarterNote',
      positionX: width / 2 + 80,
      positionY: height - 30,
      duration: 500
    }
  ];
}
class Compose extends Component {
  state = {
    composedNotes: [],
    notes: basicNotes(this.props.width, this.props.height)
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.middle !== this.props.middle
    ) {
      const positionYDifference = prevProps.middle - this.props.middle;
      this.handleUpdate(positionYDifference);
    }
  }

  handleUpdate = positionYDifference => {
    const { composedNotes } = this.state;
    let updatedComposedNotes =
      composedNotes &&
      !!composedNotes.length &&
      composedNotes.map(note => {
        return { ...note, positionY: note.positionY - positionYDifference };
      });

    this.setState({
      notes: basicNotes(this.props.width, this.props.height),
      composedNotes: updatedComposedNotes
    });
  };

  handleComposedNotes = id => {
    let notes = this.state.composedNotes;
    notes = notes
      .filter(note => note.id !== id)
      .sort((a, b) => a.positionX - b.positionX);
    return notes;
  };

  handleMouseUp = ({ id, ...note }) => {
    let composedNotes = this.handleComposedNotes(id);
    composedNotes.push({ id, ...note });
    composedNotes.sort((a, b) => a.positionX - b.positionX);
    this.setState({ composedNotes });
    this.resetNotes();
  };

  handleContextMenu = id => {
    let composedNotes = this.handleComposedNotes(id);
    this.setState({ composedNotes });
  };

  resetNotes = () => {
    this.setState({
      notes: basicNotes(this.props.width, this.props.height)
    });
  };

  render() {
    const { composedNotes = [], notes } = this.state;
    const { middle, divider, width, session, height } = this.props;
    const standardNotes = getNotes(
      middle,
      divider,
      width,
      session.gameOptions.type
    );

    return (
      <React.Fragment>
        {composedNotes &&
          !!composedNotes.length &&
          composedNotes.map(note => {
            const strippedId = note.id.replace(/[0-9]/g, '');
            const Note = noteComponents[strippedId];
            return (
              <Note
                key={note.id}
                id={note.id}
                composedNotes={composedNotes}
                standardNotes={standardNotes}
                addNote={this.handleMouseUp}
                positionX={note.positionX}
                positionY={note.positionY}
                height={height}
                width={width}
                line={note.line}
                handleContextMenu={this.handleContextMenu}
              />
            );
          })}
        {notes.map(note => {
          const Note = noteComponents[note.id];
          return (
            <Note
              key={note.id}
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
              handleContextMenu={() => {}}
            />
          );
        })}
        {session.gameOptions.playing && !!composedNotes.length && (
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
