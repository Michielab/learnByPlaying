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
      borderRadius: '35%',
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
            // justifyContent: 'space-evenly',
            // flexDirection: 'column',
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
          <Button
            key={instrumentName + index}
            onClick={() => toggleStep(index)}
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
          //{
          /* <Button
              key={instrumentName + index}
              // onClick={(e) => e.preventDefault()}
              classes={{ root: classes.button }}
              style={{
                backgroundColor: steps[index] === 0 ? '' : '#404572',
                gridColumn: `${index + 2}
                            `,
                gridRow: `row ${row} / span 1 `,
                zIndex: 9,
                alignSelf: 'end',
                pointerEvents: 'none'
              }}
            >
              {' '}
            </Button> */
          //}
        ))}
      </React.Fragment>
    );
  }
}

InstrumentRow.propTypes = {};

export default withStyles(styles)(InstrumentRow);
