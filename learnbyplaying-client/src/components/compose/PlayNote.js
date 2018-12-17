import React, { Component } from 'react';
import Sound from 'react-sound';

import PropTypes from 'prop-types';

class PlayNote extends Component {
  interval;
  index = -1;
  state = {
    activeNoteSound: ''
  };

  componentDidMount() {
    // this.createInterval();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    if(this.props.playing !== prevProps.playing) {
      // this.setState({activeNoteSound: 0})
          this.createInterval();

    }
  }


  createInterval = () => {
    this.index++;
    this.interval = setInterval(() => {
      this.updateSound(this.index);
    }, this.props.composedNotes[this.index].duration);
  };

  updateSound = index => {
    const { composedNotes } = this.props;
    clearInterval(this.interval);
    index < composedNotes.length &&
      (this.setState({
        activeNoteSound: this.index
      }),
      index < composedNotes.length - 1 && this.createInterval());
  };

  render() {
    const { activeNoteSound } = this.state;
    const { composedNotes = [], playing } = this.props;
    console.log(playing)
    return (
      <React.Fragment>
        {composedNotes.map((note, index) => (
          <Sound key={note.id + index} url={note.sound} playStatus={index === activeNoteSound ? 'PLAYING' : 'STOPPED'} />
        ))}
      </React.Fragment>
    );
  }
}

PlayNote.propTypes = {
  composedNotes: PropTypes.array
};

export default PlayNote;
