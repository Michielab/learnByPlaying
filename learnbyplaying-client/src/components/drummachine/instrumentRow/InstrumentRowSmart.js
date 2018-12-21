import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleStep } from '~/ducks/actions/actions';

import InstrumentRow from './InstrumentRow';

const mapStateToProps = (state, ownProps) => {
  console.log(state.drummachine.beatSteps.hasOwnProperty(instrumentName));
  const instrumentName = ownProps.instrumentName;
  const stepArray = state.drummachine.beatSteps.hasOwnProperty(instrumentName)
    ? [...state.drummachine.beatSteps[instrumentName]]
    : [...state.drummachine.beatSteps.steps];
  return {
    steps: stepArray
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleStep }, dispatch);
};

class InstrumentRowSmart extends React.Component {
  toggleStep = index => {
    let steps = this.props.steps;
    const stepValue = steps[index] === 1 ? 0 : 1;
    steps[index] = stepValue;
    this.props.toggleStep({ instrumentName: this.props.instrumentName, steps });
  };

  render() {
    const { row, instrumentName, classes, steps } = this.props;
    return (
      <InstrumentRow
        instrumentName={instrumentName}
        row={row}
        steps={steps}
        toggleStep={this.toggleStep}
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
