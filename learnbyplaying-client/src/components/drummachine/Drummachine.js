import React, { Component } from 'react';
import WAAClock from 'waaclock';
import { withStyles, createStyles, Slider } from '@material-ui/core';
import { triggerKick, sampleLoader } from '~/utils/Kick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAudioContext } from '~/ducks/actions/actions';

/* Import components */
import InstrumentRow from '~/components/drummachine/instrumentRow/InstrumentRow';
import Controls from './Controls';

const mapStateToProps = state => {
  console.log(state);
  return {
    audioContext: state.audio.audioContext
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setAudioContext }, dispatch);
};

const styles = theme =>
  createStyles({
    container: {
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
    },
    wrapper: {
      width: '100%',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns:
        ' (gutter) 1fr repeat(16, (col) 4.25fr (gutter) 1fr )',
      gridTemplateRows: 'repeat(9, (row) auto (gutter) 20px )',
      rowGap: '5px',
      gridGap: '5px'
    }
  });

class Drummachine extends Component {
  audioContext;
  constructor(props) {
    super(props);
    this.state = {
      // steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      // stepsSnareDrum: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // stepsHighHat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // stepsClap: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      // stepsMT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // snare909: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // stepsCrash: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // currentStep: 0,
      playing: false,
      bpm: 130
    };
  }

  componentDidMount() {
    /* To create a new audio context */
    /* WAAClock is a library that helps scheduling things in time for the 
    WEB audio API. 
    */
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    this.clock = new WAAClock(this.audioContext);
    // sampleLoader('./hihat.wav', this.audioContext, buffer => {
    //   this.highHatBuffer = buffer;
    // });
    // sampleLoader('./clap.wav', this.audioContext, buffer => {
    //   this.clapBuffer = buffer;
    // });
    // sampleLoader('./mt01.wav', this.audioContext, buffer => {
    //   this.mtBuffer = buffer;
    // });
    // sampleLoader('./sd03.wav', this.audioContext, buffer => {
    //   this.snare909Buffer = buffer;
    // });
    // sampleLoader('./cr02.wav', this.audioContext, buffer => {
    //   this.crashBuffer = buffer;
    // });
    console.log('hi');
  }

  // componentDidUpdate(prevProps) {
  //   const { audioContext } = this.props;
  //   if (prevProps.audioContext !== audioContext) {
  //     this.setState({ audioContext });
  //   }
  // }

  /* This method is used to start playing and schedule a event for the WEB audio API
   */
  handlePlayPress = () => {
    !this.state.playing && this.startTickEvent();
  };

  clearAll = () => {
    const steps = this.state.steps.map(step => 0);
    const stepsSnareDrum = this.state.stepsSnareDrum.map(step => 0);
    const stepsHighHat = this.state.stepsHighHat.map(step => 0);
    const stepsClap = this.state.stepsClap.map(step => 0);
    const stepsMT = this.state.stepsMT.map(step => 0);
    const snare909 = this.state.snare909.map(step => 0);
    const stepsCrash = this.state.stepsCrash.map(step => 0);

    this.setState({
      steps,
      stepsSnareDrum,
      stepsHighHat,
      stepsClap,
      stepsMT,
      snare909,
      stepsCrash
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
      stepsMT,
      snare909,
      stepsCrash
    } = this.state;
    const newCurrentStep = currentStep + 1;

    console.log('handleTick');

    // if (steps[newCurrentStep % steps.length]) {
    //   triggerKick(this.audioContext, deadline);
    // }

    // if (stepsSnareDrum[newCurrentStep % stepsSnareDrum.length]) {
    //   this.trigger(this.audioContext, deadline);
    // }

    // if (stepsHighHat[newCurrentStep % stepsHighHat.length]) {
    //   this.triggerSound(this.audioContext, deadline, this.highHatBuffer);
    // }

    // if (stepsClap[newCurrentStep % stepsClap.length]) {
    //   this.triggerSound(this.audioContext, deadline, this.clapBuffer);
    // }

    // if (stepsMT[newCurrentStep % stepsMT.length]) {
    //   this.triggerSound(this.audioContext, deadline, this.mtBuffer);
    // }

    // if (snare909[newCurrentStep % snare909.length]) {
    //   this.triggerSound(this.audioContext, deadline, this.snare909Buffer);
    // }

    this.setState({ currentStep: newCurrentStep });
  }

  handleBPMChange = e => {
    this.setState(
      {
        bpm: e.target.value
      },
      () => {
        this.tickEvent &&
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

  setupSound = bufferType => {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = bufferType;
    this.source.connect(this.audioContext.destination);
  };

  triggerSound = (context, deadline, bufferType) => {
    this.setupSound(bufferType);
    this.source.start(deadline);
  };

  render() {
    const {
      currentStep,
      playing,
      steps,
      bpm,
      audioContext,
      stepsSnareDrum,
      stepsHighHat,
      stepsClap,
      stepsMT,
      snare909,
      stepsCrash
    } = this.state;
    const { classes } = this.props;


    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Controls
            handleBPMChange={this.handleBPMChange}
            handlePlayPress={this.handlePlayPress}
            clearAll={this.clearAll}
            playing={playing}
            bpm={bpm}
          />
          {/* <InstrumentRow
            typeOfInstrument="stepsHighHat"
            instrumentArray={stepsHighHat}
            row={1}
            toggleStep={this.toggleStep}
            name={'HighHat'}
            handleTick={this.handleTick}
            bpm={bpm}

            // triggerSound={)}
          />
          <InstrumentRow
            typeOfInstrument="stepsSnareDrum"
            instrumentArray={stepsSnareDrum}
            row={2}
            toggleStep={this.toggleStep}
            name={'Snare'}
            // currentStep={currentStep}
          />
          <InstrumentRow
            typeOfInstrument="stepsClap"
            instrumentArray={stepsClap}
            row={3}
            toggleStep={this.toggleStep}
            name={'Clap'}
            // currentStep={currentStep}
          /> */}
          {/* <InstrumentRow
            typeOfInstrument="stepsMT"
            instrumentArray={stepsMT}
            row={4}
            toggleStep={this.toggleStep}
            name={'MT'}
            // currentStep={currentStep}

          />
          <InstrumentRow
            typeOfInstrument="snare909"
            instrumentArray={snare909}
            row={5}
            toggleStep={this.toggleStep}
            name={'Snare909'}
            // currentStep={currentStep}

          />
          <InstrumentRow
            typeOfInstrument="stepsCrash"
            instrumentArray={stepsCrash}
            row={6}
            toggleStep={this.toggleStep}
            name={'Crash'}
            // currentStep={currentStep}

          /> */}

            <React.Fragment>
              <InstrumentRow
                name={'Kick1'}
                row={1}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
              <InstrumentRow
                name={'Kick2'}
                row={2}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
              <InstrumentRow
                name={'Kick3'}
                row={3}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
              <InstrumentRow
                name={'Kick4'}
                row={4}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
              <InstrumentRow
                name={'Kick5'}
                row={5}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
              <InstrumentRow
                name={'Kick6'}
                row={6}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
              {/* <InstrumentRow
                name={'Kick'}
                row={7}
                // lastRow={true}
                clock={this.clock}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              /> */}
              <InstrumentRow
                name={'Kick7'}
                clock={this.clock}
                row={7}
                lastRow={true}
                currentStep={currentStep}
                bpm={bpm}
               tick={this.tickEvent}
              />
            </React.Fragment>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Drummachine));
