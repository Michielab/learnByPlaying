import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles, Button } from '@material-ui/core';
import { Slider } from 'material-ui-slider';
import { VolumeMute, VolumeUp } from '@material-ui/icons/';

const styles = theme =>
  createStyles({
    button: {
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      // borderRadius: '35%',
      height: '50px',
      width: '50px',
      '&:hover': {
        backgroundColor: '#212121'
      }
    },
    warpSlider: {
      top: '-15px'
    },
    sliderPointer: {
      //  backgroundColor: 'rgb(64, 69, 114) !important'
      // backgroundColor: '#404671 !important'
    }
  });

class InstrumentRow extends React.PureComponent {
  state = {
    selectedStep: '',
    clientY: '',
  };

  handleMouseDown = (clientY, step) => {
    this.setState({
      selectedStep: step,
      clientY: clientY
    });
  };

  handleMouseUp = (clientY, step) => {
    if (this.state.clientY) {
      this.handleVolumeChange(clientY, step);
    }
  };

  handleMouseOut = (clientY, step) => {
    if (this.state.clientY) {
      this.handleVolumeChange(clientY, step);
    }
  };

  handleVolumeChange = (clientY, step) => {
    let height = (46 / 100) * this.props.steps[step].amplitude;

    let volume;
    this.state.clientY - clientY > 0
      ? (volume =
          ((this.state.clientY - clientY) / 46) * 100 + this.props.steps[step].amplitude)
      : (volume = ((height + (this.state.clientY - clientY)) / 46) * 100);

    volume > 100 && (volume = 100);
    volume < 0 && (volume = 0);
    this.setState({
      selectedStep: '',
      clientY: '',
      volume
    }, this.props.toggleStep(step, volume))
  };

  render() {
    const {
      row,
      instrumentName,
      classes,
      steps,
      toggleStep,
      mainGain,
      changeAmplitude,
      toggleMute,
      amplitude
    } = this.props;

    let gainValue = amplitude.hasOwnProperty(instrumentName + 'Mute')
      ? amplitude[instrumentName + 'Mute']
        ? 0
        : mainGain
      : mainGain;

    return (
      <React.Fragment>
        <div
          style={{
            gridColumn: 1,
            gridRow: `row ${row} / span 1 `,
            display: 'flex',
            alignItems: 'center',
            marginRight: '10px',
            color: 'floralwhite'
          }}
        >
          <Button
            onClick={() => toggleMute(instrumentName)}
            style={{
              minWidth: 'unset',
              minHeight: 'unset',
              width: '20px',
              gridColumn: 1,
              gridRow: `row ${row} / span 1 `,
              color: '#D3D3D3',
              padding: '0'
            }}
          >
            {gainValue === 0 ? <VolumeMute /> : <VolumeUp />}
          </Button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginLeft: '10px'
            }}
          >
            <span>{instrumentName}</span>
            <Slider
              style={{ width: '64px', height: '20px' }}
              classes={{
                warp: classes.warpSlider,
                pointer: classes.sliderPointer
              }}
              min={0}
              max={200}
              value={gainValue}
              onChange={value => changeAmplitude(instrumentName, value)}
              componentPropType="span"
            />
          </div>
        </div>
        {steps.map((step, index) => (
          <React.Fragment key={instrumentName + index}>
            <Button
              classes={{ root: classes.button }}
              style={{
                // backgroundColor: steps[index] === 0 ? '' : '#404572',
                gridColumn: `${index + 2}
                 `,
                gridRow: `row ${row} / span 1 `
              }}
              onMouseDown={e =>
                this.handleMouseDown(e.clientY, index + instrumentName)
              }
              onMouseUp={e =>
                this.handleMouseUp(e.clientY, index)
              }
              onMouseLeave={e =>
                this.handleMouseOut(e.clientY, index)
              }
            >
              <span
                style={{
                  width: '100%',
                  // width: step.amplitude < 60 ? `${80}%` : '100%',
                backgroundColor: steps[index].step === 0 ? '' : '#404572',
                // borderRadius: step.amplitude < 60 ? `${50}%` : '33%',
                  position: 'absolute',
                  bottom: 0,
                  height: `${step.amplitude}%` 
                }}
              />
            </Button>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

InstrumentRow.propTypes = {
  instrumentName: PropTypes.string,
  steps: PropTypes.array,
  parts: PropTypes.array,
  part: PropTypes.string,
  row: PropTypes.number,
  mainGain: PropTypes.number,
  amplitude: PropTypes.object,
  toggleStep: PropTypes.func,
  changeAmplitude: PropTypes.func,
  toggleMute: PropTypes.func
};

export default withStyles(styles)(InstrumentRow);
