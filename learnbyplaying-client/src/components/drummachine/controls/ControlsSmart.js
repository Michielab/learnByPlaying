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

const mapStateToProps = state => {
  return {
    bpm: state.drummachine.drummachine.bpm,
    playing: state.drummachine.drummachine.playing,
    beatSteps: state.drummachine.beatSteps,
    parts: state.drummachine.parts,
    activePart: state.drummachine.activePart,
    selectedParts: state.drummachine.selectedParts,
    steps: state.drummachine.beatSteps.steps,
    currentStep: state.drummachine.drummachine.currentStep
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

    // if (Object.keys(beatSteps).length === 1) {
    //   return null;
    // }
    // console.log(beatSteps)

    Object.keys(beatSteps).filter(el => el !== 'steps').map(part =>
      Object.keys(beatSteps[part]).map(
        instrument =>
          (beatSteps[part][instrument] = beatSteps[part][instrument].map(step => 0))
      )
    );
    // console.log(
    //   Object.keys(beatSteps).filter(el => el !== 'steps').map(part => Object))
    this.props.handleClearAllAction(beatSteps);
  };

  toggleParts = index => {
    const { selectPart, selectedParts, parts, activePart } = this.props;
    let newSelectedParts = selectedParts;

    selectedParts.indexOf(parts[index]) !== -1 &&
    parts[activePart] === parts[index]
      ? (newSelectedParts = newSelectedParts.filter(
          part => part !== parts[index]
        ))
      : selectedParts.indexOf(parts[index]) !== -1
      ? ''
      : newSelectedParts.push(parts[index]);

    selectPart(index, newSelectedParts);
  };

  render() {
    const {
      handleBPMChange,
      togglePlay,
      playing,
      bpm,
      parts,
      activePart,
      selectedParts,
      currentStep,
      steps
    } = this.props;

    return (
      <Controls
        togglePlay={togglePlay}
        handleBPMChange={handleBPMChange}
        handleClearAll={this.handleClearAll}
        playing={playing}
        bpm={bpm}
        toggleParts={this.toggleParts}
        parts={parts}
        activePart={activePart}
        selectedParts={selectedParts}
        currentStep={currentStep}
        steps={steps}
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
