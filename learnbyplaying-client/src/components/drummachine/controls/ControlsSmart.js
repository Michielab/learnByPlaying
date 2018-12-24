import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Imports Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  togglePlay,
  handleBPMChange,
  handleClearAll as handleClearAllAction,
  selectPart
} from '~/ducks/actions/actions';

/* Imports components */
import Controls from '~/components/drummachine/controls/Controls';

const mapStateToProps = (state) => {
  return {
    bpm: state.drummachine.drummachine.bpm,
    playing: state.drummachine.drummachine.playing,
    beatSteps: state.drummachine.beatSteps,
    parts: state.drummachine.parts,
    activePart: state.drummachine.activePart
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { togglePlay, handleBPMChange, handleClearAllAction, selectPart },
    dispatch
  );
};

class ControlsSmart extends Component {
  /* method to clear all the steps */
  handleClearAll = () => {
    let { beatSteps } = this.props;

    if (Object.keys(beatSteps).length === 1) {
      return null;
    }

    Object.keys(beatSteps).map(
      instrument =>
        (beatSteps[instrument] = beatSteps[instrument].map(step => 0))
    );

    this.props.handleClearAllAction(beatSteps);
  };

  render() {
    const { handleBPMChange, togglePlay, playing, bpm, selectPart, parts, activePart } = this.props;

    return (
      <Controls
        togglePlay={togglePlay}
        handleBPMChange={handleBPMChange}
        handleClearAll={this.handleClearAll}
        playing={playing}
        bpm={bpm}
        selectPart={selectPart}
        parts={parts}
        activePart={activePart}
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
