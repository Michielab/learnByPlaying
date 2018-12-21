import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { steps: state.drummachine.beatSteps.steps };
}

class StepsIndicator extends Component {
  render() {
    const { steps, currentStep } = this.props;
    return steps.map((step, index) => (
      <span
        key={'steps' + index}
        style={{
          color: 'floralwhite',
          textAlign: 'center',
          borderRadius: '5px',
          backgroundColor:
            currentStep % steps.length === index ? '#2AB859' : '',
          gridColumn: `${index + 2}
         
                  
               `,
          gridRow: '9 / span 1 '
        }}
      >
        {index + 1}
      </span>
    ));
  }
}

export default connect(mapStateToProps)(StepsIndicator);
