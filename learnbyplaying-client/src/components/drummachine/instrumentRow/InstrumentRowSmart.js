import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleStep } from '~/ducks/actions/actions';

import InstrumentRow from './InstrumentRow';

const mapStateToProps = (state, ownProps) => {
  const part = state.drummachine.parts[state.drummachine.activePart];
  const instrumentName = ownProps.instrumentName;
  const stepArray = state.drummachine.beatSteps[part].hasOwnProperty(
    instrumentName
  )
    ? [...state.drummachine.beatSteps[part][instrumentName]]
    : [...state.drummachine.beatSteps.steps];
  return {
    steps: stepArray,
    parts: state.drummachine.parts,
    part,
    beatSteps: state.drummachine.beatSteps,
    activePart: state.drummachine.activePart
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleStep }, dispatch);
};

class InstrumentRowSmart extends React.PureComponent {
  toggleStep = index => {
    const { part, beatSteps, parts, activePart, instrumentName } = this.props;

    let newSteps = beatSteps;

    if (
      (!newSteps[parts[0]].hasOwnProperty(instrumentName) &&
        activePart === 1) ||
      (!newSteps[parts[0]].hasOwnProperty(instrumentName) &&
        activePart === 2) ||
      (!newSteps[parts[0]].hasOwnProperty(instrumentName) && activePart === 3)
    ) {
      newSteps[parts[0]][instrumentName] = beatSteps[parts[0]].steps;
    }

    if (
      (!beatSteps[parts[1]].hasOwnProperty(instrumentName) &&
        activePart === 3) ||
      (!beatSteps[parts[1]].hasOwnProperty(instrumentName) && activePart === 2)
    ) {
      newSteps[parts[1]][instrumentName] = beatSteps[parts[1]].steps;
    }

    if (
      !beatSteps[parts[2]].hasOwnProperty(instrumentName) &&
      activePart === 3
    ) {
      newSteps[parts[2]][instrumentName] = beatSteps[parts[2]].steps;
    }

    let steps = this.props.steps;
    const stepValue = steps[index] === 1 ? 0 : 1;
    steps[index] = stepValue;

    newSteps[part][instrumentName] = steps;

    console.log(newSteps)
    this.props.toggleStep(newSteps);
  };

  render() {
    const { row, instrumentName, part, steps, parts } = this.props;
    console.log('part', part)
    return (
      <InstrumentRow
        instrumentName={instrumentName}
        row={row}
        steps={steps}
        toggleStep={this.toggleStep}
        parts={parts}
        part={part}
      />
    );
  }
}

InstrumentRowSmart.propTypes = {
  instrumentArray: PropTypes.array,
  typeOfInstrument: PropTypes.string,
  row: PropTypes.number,
  toggleStep: PropTypes.func,
  lastRow: PropTypes.bool,
  currentStep: PropTypes.number
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstrumentRowSmart);
