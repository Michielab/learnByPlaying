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
    beatSteps: state.drummachine.beatSteps
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPart }, dispatch);
};

class StepsIndicator extends Component {
  render() {
    const { currentStep, activePart, beatSteps, selectPart } = this.props;
    let { steps } = this.props;

    // steps = [...steps, ...steps, ...steps, ...steps];

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


let currentPart = 0;
            currentStep % steps.length >= 0 &&
    currentStep % steps.length < 16 
      ? (minIndex = 0, maxIndex = 16, currentPart = 0)
      : currentStep % steps.length >= 16 &&
        currentStep % steps.length < 32 
      ?( minIndex = 16, maxIndex = 32 , currentPart = 1)
      : currentStep % steps.length >= 32 &&
        currentStep % steps.length < 48 
      ? (minIndex = 32, maxIndex = 48, currentPart = 2)
      : currentStep % steps.length >= 48 &&
        currentStep % steps.length <= 64 
      ? (minIndex = 0, maxIndex = 16, currentPart = 2) : ''

    // steps =
    //   Object.keys(beatSteps['partFour']).length > 1
    //     ? [...steps, ...steps, ...steps, ...steps]
    //     : Object.keys(beatSteps['partThree']).length > 1
    //     ? [...steps, ...steps, ...steps]
    //     : Object.keys(beatSteps['partTwo']).length > 1
    //     ? [...steps, ...steps]
    //     : steps;

    //     console.log(   currentStep % steps.length >= 0 &&
    //       currentStep % steps.length < 16 &&
    //       activePart !== 0)
    //   //  if( currentStep % steps.length >= 16)   {
    // currentStep % steps.length >= 0 &&
    // currentStep % steps.length < 16 &&
    // activePart !== 0
    //   ? (selectPart('0'),minIndex = 0, maxIndex = 16, console.log('insideeee'))
    //   : currentStep % steps.length >= 16 &&
    //     currentStep % steps.length < 32 &&
    //     activePart !== 1
    //   ?( selectPart('1'),minIndex = 16, maxIndex = 32)
    //   : currentStep % steps.length >= 32 &&
    //     currentStep % steps.length < 48 &&
    //     activePart !== 2
    //   ? (selectPart('2'), minIndex = 32, maxIndex = 48)
    //   : currentStep % steps.length >= 48 &&
    //     currentStep % steps.length < 64 &&
    //     activePart !== 3
    //   ? (selectPart('3') ,minIndex = 0, maxIndex = 16)
    //   : ''
      //  }
      console.log( currentStep % steps.length, 'currentPart', currentPart)
    return steps.map(
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
              gridColumn: `${index + 2 - (16 * currentPart)}
         
                  
               `,
              gridRow: '9 / span 1 '
            }}
          >
            {index + 1}
            {console.log('index', index)}
          </span>


        )
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepsIndicator);
