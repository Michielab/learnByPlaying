import React, { Component } from 'react';
import WAAClock from 'waaclock';
import { triggerKick, sampleLoader } from '~/utils/Kick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentStep } from '~/ducks/actions/actions';

const mapStateToProps = state => {
  return {
    playing: state.drummachine.drummachine.playing,
    bpm: state.drummachine.drummachine.bpm,
    beatSteps: state.drummachine.beatSteps,
    currentStep: state.drummachine.drummachine.currentStep,
    activePart: state.drummachine.activePart,
    parts: state.drummachine.parts
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setCurrentStep }, dispatch);
};

class Drummachine extends Component {
  audioContext;
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
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
    sampleLoader('./hihat.wav', this.audioContext, buffer => {
      this.highHatBuffer = buffer;
    });
    sampleLoader('./clap.wav', this.audioContext, buffer => {
      this.clapBuffer = buffer;
    });
    sampleLoader('./mt01.wav', this.audioContext, buffer => {
      this.mtBuffer = buffer;
    });
    sampleLoader('./sd03.wav', this.audioContext, buffer => {
      this.snare909Buffer = buffer;
    });
    sampleLoader('./cr02.wav', this.audioContext, buffer => {
      this.crashBuffer = buffer;
    });
    console.log('hi');
  }

  componentDidUpdate(prevProps) {
    const { playing, bpm } = this.props;
    if (prevProps.playing !== playing) {
      !playing ? this.stopTickEvent() : this.startTickEvent();
    }
  }

  covertBMPtoSeconds = bpm => {
    return 60 / bpm / 4;
  };

  /* This method is used to start playing and schedule a event for the WEB audio API
   */

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
      beatSteps,
      currentStep,
      setCurrentStep,
      parts,
      activePart
    } = this.props;
    const newCurrentStep = currentStep + 1;
    let steps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let beats = {};

    let keyArray = Object.keys(beatSteps).filter(
      element => element !== 'steps'
    );

console.log('beats', beats, 'currentStep', currentStep)

    keyArray.map(part =>
      Object.keys(beatSteps[part]).map((instrument, index) => {
        return beats.hasOwnProperty(instrument)
          ? (beats[instrument] = beats[instrument].concat(
              ...beatSteps[part][instrument]
            ))
          : (beats[instrument] = beatSteps[part][instrument]);
      })
    );


    steps =
      Object.keys(beatSteps['partFour']).length > 1
        ? [...steps, ...steps, ...steps, ...steps]
        : Object.keys(beatSteps['partThree']).length > 1
        ? [...steps, ...steps, ...steps] :Object.keys(beatSteps['partTwo']).length > 1
        ? [...steps, ...steps ] : steps

        console.log('steps', steps)


    Object.keys(beats).map((instrument, index) => {
      if (beats[instrument][newCurrentStep % steps.length]) {
        console.log(beats[instrument],[newCurrentStep % steps.length] )

        const buffer = instrument + 'Buffer';

        instrument === 'kick'
          ? triggerKick(this.audioContext, deadline)
          : this.triggerSound(this.audioContext, deadline, this[buffer]);
      }
    });

    setCurrentStep(newCurrentStep);
  }

  setupSound = bufferType => {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = bufferType;
    this.source.connect(this.audioContext.destination);
  };

  triggerSound = (context, deadline, bufferType) => {
    this.setupSound(bufferType);
    this.source.start(deadline);
  };

  // noiseBuffer = () => {
  //   var bufferSize = this.audioContext.sampleRate;
  //   var buffer = this.audioContext.createBuffer(
  //     1,
  //     bufferSize,
  //     this.audioContext.sampleRate
  //   );
  //   var output = buffer.getChannelData(0);

  //   for (var i = 0; i < bufferSize; i++) {
  //     output[i] = Math.random() * 2 - 1;
  //   }

  //   return buffer;
  // };

  // setup = () => {
  //   this.noise = this.audioContext.createBufferSource();
  //   this.noise.buffer = this.noiseBuffer();
  //   var noiseFilter = this.audioContext.createBiquadFilter();
  //   noiseFilter.type = 'highpass';
  //   noiseFilter.frequency.value = 1000;
  //   this.noise.connect(noiseFilter);
  //   this.noiseEnvelope = this.audioContext.createGain();
  //   noiseFilter.connect(this.noiseEnvelope);

  //   this.noiseEnvelope.connect(this.audioContext.destination);
  //   this.osc = this.audioContext.createOscillator();
  //   this.osc.type = 'triangle';

  //   this.oscEnvelope = this.audioContext.createGain();
  //   this.osc.connect(this.oscEnvelope);
  //   this.oscEnvelope.connect(this.audioContext.destination);
  // };

  // trigger = (context, deadline) => {
  //   this.setup();
  //   console.log('hi');
  //   this.noiseEnvelope.gain.setValueAtTime(1, deadline);
  //   this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, deadline + 0.2);
  //   this.noise.start(deadline);

  //   this.osc.frequency.setValueAtTime(100, deadline);
  //   this.oscEnvelope.gain.setValueAtTime(0.7, deadline);
  //   this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, deadline + 0.1);
  //   this.osc.start(deadline);

  //   this.osc.stop(deadline + 0.2);
  //   this.noise.stop(deadline + 0.2);
  // };

  render() {
    return <div />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drummachine);
