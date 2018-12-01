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
  timeoutCheck;
  timeoutDisable;

  state = {
    number: '',
    note: '',
    buttonDisabled: false,
    playStatus: 'STOPPED'
  };

  componentDidMount() {
    this.nextNote();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutCheck);
    clearTimeout(this.timeoutDisable);
  }

  nextNote = () => {
    let randomNumber = Math.floor(Math.random() * this.notes.length);
    let stateNumber = this.state.number;
    randomNumber !== stateNumber
      ? this.setState({ number: randomNumber, playStatus: 'PLAYING' })
      : this.nextNote();
  };

  check = answer => {
    let currentNote = this.notes[this.state.number].name;
    this.disableButtons();
    this.stopPlayStatus();
    answer === currentNote ? this.correctAnswer() : this.wrongAnswer();
  };

  correctAnswer = () => {
    clearTimeout(this.timeoutCheck);
    this.timeoutCheck = setTimeout(() => {
      this.props.addPoints();
      this.nextNote();
      this.playingPlayStatus();
      this.setState({ buttonDisabled: false });
    }, 750);
  };

  wrongAnswer = () => {
    clearTimeout(this.timeoutCheck);
    this.timeoutCheck = setTimeout(() => {
      this.props.deductPoints();
      this.setState({ buttonDisabled: false });
    }, 750);
  };

  disableButtons = () => {
    clearTimeout(this.timeoutDisable);
    this.timeoutDisable = setTimeout(() => {
      this.setState({ buttonDisabled: true });
    }, 250);
  };

  stopPlayStatus = () => {
    this.setState({
      playStatus: 'STOPPED'
    });
  };

  playingPlayStatus = () => {
    this.setState({
      playStatus: 'PLAYING'
    });
  };

  render() {
    const { number, buttonDisabled, playStatus } = this.state;
    const { middle, divider, width, session } = this.props;
    const domNode = document.getElementById('staveContainer');

    this.notes = getNotes(middle, divider, width, session.gameOptions.type);
    let note = this.notes[number];
    return note ? (
      <React.Fragment>
        <Note
          cx={note.positionX}
          cy={note.positionY}
          line={note.line}
          onClick={this.playingPlayStatus}
        />
        <Sound url={note.sound} playStatus={playStatus} />
        {ReactDOM.createPortal(
          this.props.children({
            notes: this.notes,
            check: this.check,
            currentNote: note,
            buttonDisabled
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
