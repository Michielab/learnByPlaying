import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

/* Helper function to get notes  */
import { getNotes } from '~/components/notes/Notes';

/* Import Note component  */
import Note from '~/components/notes/Note';

class Learn extends Component {
  notes;
  check;

  state = {
    number: '',
    note: ''
  };

  componentDidMount() {
    this.nextNote();
  }

  nextNote = () => {
    let randomNumber = Math.floor(Math.random() * this.notes.length);
    let stateNumber = this.state.number;
    randomNumber !== stateNumber
      ? this.setState({ number: randomNumber })
      : this.nextNote();
  };

  check = answer => {
    let currentNote = this.notes[this.state.number].name;
    answer === currentNote
      ? setTimeout(() => {
          this.nextNote();
          this.props.addPoints();
        }, 500)
      : this.props.deductPoints();
  };

  render() {
    const { number } = this.state;
    const { middle, divider, width, session } = this.props;
    const domNode = document.getElementById('staveContainer');

    this.notes = getNotes(middle, divider, width, session.gameOptions.type);
    let note = this.notes[number];

    return note ? (
      <React.Fragment>
        <Note cx={note.positionX} cy={note.positionY} line={note.line} />
        <Sound url={note.sound} playStatus="PLAYING" />
        {ReactDOM.createPortal(
          this.props.children({
            notes: this.notes,
            check: this.check,
            currentNote: note
          }),
          domNode
        )}
      </React.Fragment>
    ) : (
      <div>Loading</div>
    );
  }
}

Learn.propTypes = {
  addPoints: PropTypes.func,
  children: PropTypes.func,
  classes: PropTypes.object,
  deductPoints: PropTypes.func,
  divider: PropTypes.number,
  middle: PropTypes.number,
  session: PropTypes.object,
  setGameOptions: PropTypes.func,
  width: PropTypes.number
};

export default Learn;
