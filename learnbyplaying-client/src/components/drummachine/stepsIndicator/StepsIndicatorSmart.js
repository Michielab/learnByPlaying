import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Imports Redux */
import { selectPart } from '~/ducks/actions/actions';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
  return {
    steps: state.drummachine.beatSteps.steps,
    currentStep: state.drummachine.drummachine.currentStep,
    parts: state.drummachine.parts,
    activePart: state.drummachine.activePart,
    beatSteps: state.drummachine.beatSteps,
    selectedParts: state.drummachine.selectedParts
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPart }, dispatch);
};

class StepsIndicator extends Component {
  render() {
    const {
      currentStep,
      activePart,
      selectedParts,
    } = this.props;
    let { steps } = this.props;

    let allSteps = [...steps, ...steps, ...steps, ...steps];

    let minIndex =
      activePart === 0 ? 0 : activePart === 1 ? 16 : activePart === 2 ? 32 : 48;

    let maxIndex =
      activePart === 0
        ? 16
        : activePart === 1
        ? 32
        : activePart === 2
        ? 48
        : 64;

    steps =
      selectedParts.indexOf('partFour') !== -1
        ? [...steps, ...steps, ...steps, ...steps]
        : selectedParts.indexOf('partThree') !== -1
        ? [...steps, ...steps, ...steps]
        : selectedParts.indexOf('partTwo') !== -1
        ? [...steps, ...steps]
        : steps;

    return allSteps.map(
      (step, index) =>
        index >= minIndex &&
        index < maxIndex && (
          <span
            key={'steps' + index}
            style={{
              color: 'floralwhite',
              textAlign: 'center',
              borderRadius: '5px',
              backgroundColor:
                currentStep % steps.length === index ? '#2AB859' : '',
              gridColumn: `${index + 2 - 16 * activePart}
         
                  
               `,
              gridRow: '12 / span 1 '
            }}
          >
            {index + 1}
          </span>
        )
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsIndicator);
