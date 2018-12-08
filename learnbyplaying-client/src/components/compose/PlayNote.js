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
    this.createInterval();
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
        activeNoteSound: composedNotes[this.index].sound
      }),
      index < composedNotes.length - 1 && this.createInterval());
  };

  render() {
    const { activeNoteSound } = this.state;
    return (
      <div>
        <Sound url={activeNoteSound} playStatus={'PLAYING'} />
      </div>
    );
  }
}

PlayNote.propTypes = {};

export default PlayNote;