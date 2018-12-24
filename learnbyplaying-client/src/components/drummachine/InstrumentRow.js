import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core';
import { Button } from '@material-ui/core';
import WAAClock from 'waaclock';
import { triggerKick, sampleLoader } from '~/utils/Kick';

const styles = theme =>
  createStyles({
    button: {
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      width: '50px',
      '&:hover': {
        backgroundColor: '#212121'
      }
    }
  });

class InstrumentRow extends React.Component {
  state = {
    steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    currentStep: 0
  };

  componentDidMount() {
    // this.audioContext = this.props.audioContext;
    // this.clock = this.props.clock;
    console.log(this.clock)
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.playing !== this.props.playing) {
  //     this.startTickEvent();
  //   }
  // }

  startTickEvent = () => {
    const { bpm } = this.props;
    this.setState(
      {
        currentStep: -1,
        playing: true
      },
      () => {
        this.clock.start();
        this.tickEvent = this.clock
          .callbackAtTime(
            this.handleTick.bind(this),
            this.audioContext.currentTime
          )
          .repeat(this.covertBMPtoSeconds(bpm));
      }
    );
  };

  covertBMPtoSeconds = bpm => {
    return 60 / bpm / 4;
  };


    /* callback function that is going to be called before the sound is played */
    handleTick({ deadline }) {
      const {
        currentStep,
        steps,
        stepsSnareDrum,
        stepsHighHat,
        stepsClap,
        stepsMT,
        snare909,
        stepsCrash
      } = this.state;
      const newCurrentStep = currentStep + 1;
  
      console.log('handleTick');
  
      if (steps[newCurrentStep % steps.length]) {
        triggerKick(this.audioContext, deadline);
      }
  
      this.setState({ currentStep: newCurrentStep });
    }

  toggleStep = index => {
    let steps = this.state.steps;
    const stepValue = steps[index] === 1 ? 0 : 1;
    steps[index] = stepValue;
    this.setState({
      steps
    });
  };

  render() {
    const {
      typeOfInstrument,
      instrumentArray,
      row,
      name,
      classes,
      lastRow = false,
      triggerSound,
      deadline,
      toggleStep,
      currentStep,
      tick
    } = this.props;

    const { steps } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            gridColumn: 1,
            gridRow: `row ${row} / span 1 `,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px',
            color: 'floralwhite'
          }}
        >
          <span>{name}</span>
        </div>
        {steps.map((step, index) => (
          <React.Fragment key={name + index}>
            <Button
              onClick={() => this.toggleStep(index)}
              classes={{ root: classes.button }}
              style={{
                backgroundColor: steps[index] === 0 ? '' : '#404572',
                gridColumn: `${index + 2}
             `,
                gridRow: `row ${row} / span 1 `
              }}
            >
              {' '}
            </Button>
            {lastRow && (
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
            )}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

InstrumentRow.propTypes = {
  instrumentArray: PropTypes.array,
  typeOfInstrument: PropTypes.string,
  row: PropTypes.number,
  toggleStep: PropTypes.func,
  lastRow: PropTypes.bool,
  currentStep: PropTypes.number
};

export default withStyles(styles)(InstrumentRow);
