import React, { Component } from 'react';
import WAAClock from 'waaclock';
import { Button } from '@material-ui/core';
import { withStyles, createStyles, Slider } from '@material-ui/core';
import { PlayArrow, Stop, ClearAll } from '@material-ui/icons/';
import { triggerKick } from '~/utils/Kick';

/* Import components */
import InstrumentRow from './InstrumentRow';

const styles = theme =>
  createStyles({
    wrapper: {
      width: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns:
        ' (gutter) 1fr repeat(16, (col) 4.25fr (gutter) 1fr )',
      gridTemplateRows: 'repeat(9, (row) auto (gutter) 20px )',
      rowGap: '5px',
      gridGap: '5px'
    },
    button: {
      backgroundColor: '#212121',
      color: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(255, 255, 255, 0.8) solid 2px',
      borderRadius: '35%',
      height: '50px',
      width: '50px',
      //   webkitBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      //   mozBoxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      //   boxShadow: '4px 7px 10px 3px rgba(0,0,0,0.75)',
      //   margin: '0 10px',
      '&:hover': {
        backgroundColor: '#212121'
      },
      '&:disabled': {
        color: 'rgba(255, 255, 255, 0.8)',
        cursor: 'pointer',
        pointerEvents: 'unset',
        '&:hover': {
          backgroundColor: '#212121'
        }
      }
    },
    rippleCorrect: {
      color: 'green !important'
    },
    rippleWrong: {
      color: 'red !important'
    },
    playButton: {
      marginTop: '5px',
      backgroundColor: '#2FD566',
      '&:hover': {
        backgroundColor: '#2FD566'
      },
      color: '#FFFFFF'
    },
    stopButton: {
      marginTop: '5px',
      backgroundColor: 'red',
      '&:hover': {
        backgroundColor: 'red'
      },
      color: '#FFFFFF'
    }
  });

class Drummachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      stepsSnareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stepsHighHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stepsClap: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      stepsMT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentStep: 0,
      playing: false,
      bpm: 140
    };
  }

  componentDidMount() {
    /* To create a new audio context */
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    /* WAAClock is a library that helps scheduling things in time for the 
    WEB audio API. 
    */
    this.clock = new WAAClock(this.audioContext);
    this.sampleLoader('./hihat.wav', this.audioContext, buffer => {
      this.highHatBuffer = buffer;
      console.log(this.highHatBuffer);
    });
    this.sampleLoader('./clap.wav', this.audioContext, buffer => {
      this.clapBuffer = buffer;
      console.log(this.clapBuffer);
    });
    this.sampleLoader('./mt01.wav', this.audioContext, buffer => {
      this.mtBuffer = buffer;
      console.log(this.clapBuffer);
    });
  }

  /* This method is used to start playing and schedule a event for the WEB audio API
   */
  handlePlayPress = () => {
    const { playing } = this.state;
    !playing ? this.startTickEvent() : this.stopTickEvent();
  };

  clearAll = () => {
    const steps = this.state.steps.map(step => 0);
    const stepsSnareDrum = this.state.stepsSnareDrum.map(step => 0);
    const stepsHighHat = this.state.stepsHighHat.map(step => 0);
    const stepsClap = this.state.stepsClap.map(step => 0);
    const stepsMT = this.state.stepsMT.map(step => 0);
    this.setState({
      steps,
      stepsSnareDrum,
      stepsHighHat,
      stepsClap,
      stepsMT
    });
  };

  startTickEvent = () => {
    const { bpm } = this.state;
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
          .repeat(this.covertBMPtoSeconds(this.state.bpm));
      }
    );
  };

  stopTickEvent = () => {
    this.setState({ playing: false }, () => {
      this.clock.stop();
      this.tickEvent.clear();
      this.tickEvent = null;
    });
  };

  /* callback function that is going to be called before the sound is played */
  handleTick({ deadline }) {
    const {
      currentStep,
      steps,
      stepsSnareDrum,
      stepsHighHat,
      stepsClap,
      stepsMT
    } = this.state;
    const newCurrentStep = currentStep + 1;

    if (steps[newCurrentStep % steps.length]) {
      triggerKick(this.audioContext, deadline);
    }
    if (stepsSnareDrum[newCurrentStep % stepsSnareDrum.length]) {
      this.trigger(this.audioContext, deadline);
    }

    if (stepsHighHat[newCurrentStep % stepsHighHat.length]) {
      this.triggerHighHat(this.audioContext, deadline);
      // this.sampleLoader('../../sounds/hihat.wav', this.audioContext, function(this.noiseBuffer()) {
      //     this.triggerHighHat(deadline);
      // });
    }

    if (stepsClap[newCurrentStep % stepsClap.length]) {
      this.triggerClap(this.audioContext, deadline);
      // this.sampleLoader('../../sounds/hihat.wav', this.audioContext, function(this.noiseBuffer()) {
      //     this.triggerHighHat(deadline);
      // });
    }

    if (stepsMT[newCurrentStep % stepsMT.length]) {
      this.triggerMT(this.audioContext, deadline);
      // this.sampleLoader('../../sounds/hihat.wav', this.audioContext, function(this.noiseBuffer()) {
      //     this.triggerHighHat(deadline);
      // });
    }
    this.setState({ currentStep: newCurrentStep });
  }

  toggleStep = (type, index) => {
    console.log('toggleStep', type, index)
    let steps = this.state[type];
    const stepValue = steps[index] === 1 ? 0 : 1;
    steps[index] = stepValue;
    this.setState({
      [type]: steps
    });
  };

  handleBPMChange = e => {
    this.setState(
      {
        bpm: e.target.value
      },
      () => {
        this.tickEvent.repeat(this.covertBMPtoSeconds(this.state.bpm));
      }
    );
  };

  covertBMPtoSeconds = bpm => {
    return 60 / bpm / 4;
  };

  noiseBuffer = () => {
    var bufferSize = this.audioContext.sampleRate;
    var buffer = this.audioContext.createBuffer(
      1,
      bufferSize,
      this.audioContext.sampleRate
    );
    var output = buffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  };

  setup = () => {
    this.noise = this.audioContext.createBufferSource();
    this.noise.buffer = this.noiseBuffer();
    var noiseFilter = this.audioContext.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    this.noise.connect(noiseFilter);
    this.noiseEnvelope = this.audioContext.createGain();
    noiseFilter.connect(this.noiseEnvelope);

    this.noiseEnvelope.connect(this.audioContext.destination);
    this.osc = this.audioContext.createOscillator();
    this.osc.type = 'triangle';

    this.oscEnvelope = this.audioContext.createGain();
    this.osc.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.audioContext.destination);
  };

  trigger = (context, deadline) => {
    this.setup();
    console.log('hi');
    this.noiseEnvelope.gain.setValueAtTime(1, deadline);
    this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, deadline + 0.2);
    this.noise.start(deadline);

    this.osc.frequency.setValueAtTime(100, deadline);
    this.oscEnvelope.gain.setValueAtTime(0.7, deadline);
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, deadline + 0.1);
    this.osc.start(deadline);

    this.osc.stop(deadline + 0.2);
    this.noise.stop(deadline + 0.2);
  };

  setupHighHat = () => {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.highHatBuffer;
    this.source.connect(this.audioContext.destination);
  };

  triggerHighHat = (context, deadline) => {
    this.setupHighHat();
    this.source.start(deadline);
  };

  sampleLoader = (url, context, callback) => {
    var request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        callback(buffer);
      });
    };
    request.send();
  };

  setupClap = () => {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.clapBuffer;
    this.source.connect(this.audioContext.destination);
  };

  triggerClap = (context, deadline) => {
    this.setupClap();
    this.source.start(deadline);
  };

  setupMT = () => {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.mtBuffer;
    this.source.connect(this.audioContext.destination);
  };

  triggerMT = (context, deadline) => {
    this.setupMT();
    this.source.start(deadline);
  };

  render() {
    const {
      currentStep,
      playing,
      steps,
      bpm,
      stepsSnareDrum,
      stepsHighHat,
      stepsClap,
      stepsMT
    } = this.state;
    const { classes } = this.props;
    console.log(this.highHatBuffer);
    return (
      <React.Fragment>
        <div
          style={{
            position: 'absolute',
            maxWidth: '1200px',
            borderRadius: '5px',
            top: ' 50%',
            left: ' 50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            backgroundColor: '#212121',
            padding: '20px 0',
            WebkitBoxShadow: '32px 24px 62px -7px rgba(0,0,0,0.56)',
            MozBoxShadow: '32px 24px 62px -7px rgba(0,0,0,0.56)',
            boxShadow: '32px 24px 62px -7px rgba(0,0,0,0.56)',
            padding: '20px'
            //   boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
          }}
        >
          <div className={classes.wrapper}>
            {/* <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '20px 0'
          }}
        > */}
            {/* <div style={{ gridColumn: 1, gridRow: 0 }}> */}
            <label
              style={{
                color: 'white',
                marginRight: '5px',
                gridColumn: 1,
                gridRow: 0,
                textAlign: 'center',
                marginTop: '4px'
              }}
            >
              BPM
            </label>
            <input
              min={40}
              max={240}
              value={bpm}
              type="number"
              onChange={this.handleBPMChange}
              style={{
                gridColumn: 2,
                gridRow: 0,
                height: '20px',
                backgroundColor: ' #212121',
                border: 'none',
                color: 'floralwhite',
                border: '2px solid',
                color: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '4px',
                textAlign: 'center',
                outline: 'initial !important'
              }}
            />
            {/* </div> */}
            <Button
              onClick={() => this.handlePlayPress()}
              style={{
                gridColumn: 16,
                gridRow: 0,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgba(255, 255, 255, 0.8)',
                border: 'solid 2px',
                height: '35px',
                marginBottom: '30px',
                borderRadius: '20%',
                width: '30px',
                padding: 0
              }}
            >
              {!playing ? <PlayArrow /> : <Stop />}
            </Button>
            <Button
              onClick={() => this.clearAll()}
              style={{
                gridColumn: 17,
                gridRow: 0,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgba(255, 255, 255, 0.8)',
                border: 'solid 2px',
                height: '35px',
                marginBottom: '30px',
                borderRadius: '20%',
                width: '30px',
                padding: 0
              }}
            >
              <ClearAll />
            </Button>
            {/* </div> */}
            <InstrumentRow
              typeOfInstrument="stepsHighHat"
              instrumentArray={stepsHighHat}
              row={1}
              toggleStep={this.toggleStep}
              name={'HighHat'}
            />
            {/* <div
              style={{
                gridColumn: 1,
                gridRow: 'row 1/ span 1 ',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                color: 'floralwhite'
              }}
            >
              <span>HighHat</span>
            </div>
            {stepsHighHat.map((step, index) => (
              <Button
                key={'highHat' + index}
                onClick={() => this.toggleStep('stepsHighHat', index)}
                classes={{ root: classes.button }}
                style={{
                  backgroundColor: stepsHighHat[index] === 0 ? '' : '#404572',
                  gridColumn: `${index + 2}
             `,
                  gridRow: 'row 1 / span 1 '
                }}
              >
                {' '}
              </Button>
            ))} */}
            <div
              style={{
                gridColumn: 1,
                gridRow: 'row 2/ span 1 ',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                color: 'floralwhite'
              }}
            >
              <span>Snare</span>
            </div>
            {stepsSnareDrum.map((step, index) => (
              <Button
                key={'snare' + index}
                onClick={() => this.toggleStep('stepsSnareDrum', index)}
                classes={{ root: classes.button }}
                style={{
                  backgroundColor: stepsSnareDrum[index] === 0 ? '' : '#404572',
                  gridColumn: `${index + 2}
             `,
                  gridRow: 'row 2 / span 1 '
                }}
              >
                {' '}
              </Button>
            ))}
            <div
              style={{
                gridColumn: 1,
                gridRow: 'row 3/ span 1 ',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                color: 'floralwhite'
              }}
            >
              <span>Clap</span>
            </div>
            {stepsClap.map((step, index) => (
              <Button
                key={'clap' + index}
                onClick={() => this.toggleStep('stepsClap', index)}
                classes={{ root: classes.button }}
                style={{
                  backgroundColor: stepsClap[index] === 0 ? '' : '#404572',
                  gridColumn: `${index + 2}
             `,
                  gridRow: 'row 3 / span 1 '
                }}
              >
                {' '}
              </Button>
            ))}
            <div
              style={{
                gridColumn: 1,
                gridRow: 'row 4/ span 1 ',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                color: 'floralwhite'
              }}
            >
              <span>MT</span>
            </div>
            {stepsMT.map((step, index) => (
              <Button
                key={'clap' + index}
                onClick={() => this.toggleStep('stepsMT', index)}
                classes={{ root: classes.button }}
                style={{
                  backgroundColor: stepsMT[index] === 0 ? '' : '#404572',
                  gridColumn: `${index + 2}
             `,
                  gridRow: 'row 4 / span 1 '
                }}
              >
                {' '}
              </Button>
            ))}
            <div
              style={{
                gridColumn: 1,
                gridRow: 'row 5/ span 1 ',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                color: 'floralwhite'
              }}
            >
              <span>Kick</span>
            </div>
            {steps.map((step, index) => (
              <React.Fragment key={'kick' + index}>
                <Button
                  onClick={() => this.toggleStep('steps', index)}
                  classes={{ root: classes.button }}
                  style={{
                    backgroundColor: steps[index] === 0 ? '' : '#404572',
                    gridColumn: `${index + 2}
             `,
                    gridRow: 'row 5/ span 1 '
                  }}
                >
                  {' '}
                </Button>
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
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Drummachine);
