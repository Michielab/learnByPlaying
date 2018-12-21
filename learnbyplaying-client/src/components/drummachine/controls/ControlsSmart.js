import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Material-ui */
import { withStyles } from '@material-ui/core';
import { PlayArrow, Stop, ClearAll } from '@material-ui/icons/';
import { Button } from '@material-ui/core';

/* Imports Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  togglePlay,
  handleBPMChange,
  handleClearAll
} from '~/ducks/actions/actions';

/* Imports components */
import Controls from '~/components/drummachine/controls/Controls';

const mapStateToProps = (state, ownProps) => {
  return {
    bpm: state.drummachine.bpm,
    playing: state.drummachine.playing
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { togglePlay, handleBPMChange, handleClearAll },
    dispatch
  );
};

class ControlsSmart extends Component {
  render() {
    const {
      handleBPMChange,
      togglePlay,
      handleClearAll,
      playing,
      bpm
    } = this.props;
    return (
      <Controls
        togglePlay={togglePlay}
        handleBPMChange={handleBPMChange}
        handleClearAll={handleClearAll}
        playing={playing}
        bpm={bpm}
      />
    );
  }
}

ControlsSmart.propTypes = {
  handleBPMChange: PropTypes.func,
  togglePlay: PropTypes.func,
  handleClearAll: PropTypes.func,
  playing: PropTypes.bool,
  bpm: PropTypes.number
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsSmart);
