import React, { Component } from 'react';
import WAAClock from 'waaclock';
import { triggerKick, sampleLoader } from '~/utils/Kick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentStep } from '~/ducks/actions/actions';
import AudioCtxContext from './audioContext/AudioContext';

const mapStateToProps = state => {
  return {
    playing: state.drummachine.drummachine.playing,
    bpm: state.drummachine.drummachine.bpm,
    beatSteps: state.drummachine.beatSteps,
    currentStep: state.drummachine.drummachine.currentStep,
    activePart: state.drummachine.activePart,
    parts: state.drummachine.parts,
    selectedParts: state.drummachine.selectedParts,
    amplitude: state.drummachine.amplitude
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
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    //;

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
      this.snareBuffer = buffer;
    });
    sampleLoader('./cr02.wav', this.audioContext, buffer => {
      this.crashBuffer = buffer;
    });
  //  this.draw();
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
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
    console.log(
      'bmp',
      bpm,
      'clock',
      this.clock,
      this.covertBMPtoSeconds(bpm),
      this.audioContext
    );

    this.setState(
      {
        currentStep: -1
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
    this.setState(() => {
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
      selectedParts,
      amplitude
    } = this.props;
    const newCurrentStep = currentStep + 1;
    let steps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let beats = {};

    let keyArray = Object.keys(beatSteps).filter(
      element => element !== 'steps'
    );

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
      selectedParts.indexOf('partFour') !== -1
        ? [...steps, ...steps, ...steps, ...steps]
        : selectedParts.indexOf('partThree') !== -1
        ? [...steps, ...steps, ...steps]
        : selectedParts.indexOf('partTwo') !== -1
        ? [...steps, ...steps]
        : steps;

    Object.keys(beats).map((instrument, index) => {
      if (beats[instrument][newCurrentStep % steps.length]) {
        const buffer = instrument + 'Buffer';

        const amplitudeValue = amplitude.hasOwnProperty(instrument)
          ? amplitude[instrument]
          : amplitude.mainGain;

        let gainValue = amplitude.hasOwnProperty(instrument + 'Mute')
          ? amplitude[instrument + 'Mute']
            ? 0
            : amplitudeValue / 100
          : amplitudeValue / 100;

        instrument === 'kick'
          ? triggerKick(this.audioContext, deadline, gainValue, this.analyser)
          : this.triggerSound(
              this.audioContext,
              deadline,
              this[buffer],
              gainValue
            );
      }
    });

    setCurrentStep(newCurrentStep);
  }

  setupSound = (bufferType, gainValue) => {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = bufferType;
    this.gain = this.audioContext.createGain();
    this.source.connect(this.gain);
    this.gain.connect(this.analyser);
    this.gain.gain.value = gainValue;
    this.gain.connect(this.audioContext.destination);
  };

  triggerSound = (context, deadline, bufferType, gainValue) => {
    this.setupSound(bufferType, gainValue);

    this.source.start(deadline);
  };

  canvasRef = canvas => {
    this.canvas = canvas;
    this.myCanvas = this.canvas.getContext('2d');
  };

  draw = () => {
    this.animationFrame = requestAnimationFrame(this.draw);
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.myCanvas.fillStyle = '#333333';
    // method to fill the rectangle.
    this.myCanvas.fillRect(
      0,
      0,
      this.canvas.offsetWidth,
      this.canvas.offsetHeight
    );
    this.myCanvas.lineWidth = 2;
    this.myCanvas.strokeStyle = 'rgb(40, 95, 95)';
    // this.myCanvas.strokeStyle = 'rgb(121, 134, 203)';

    this.myCanvas.beginPath();
    var sliceWidth = (this.canvas.offsetWidth * 1.0) / this.bufferLength;
    var x = 0;

    for (var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0;
      var y = (v * this.canvas.offsetHeight) / 2;
      if (i === 0) {
        this.myCanvas.moveTo(x, y);
      } else {
        this.myCanvas.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.myCanvas.lineTo(this.canvas.offsetWidth, this.canvas.offsetHeight / 2);
    this.myCanvas.stroke();
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
    return (
      <canvas
        ref={this.canvasRef}
        className="visualizer"
        style={{
          gridArea: '1 / 7 / 3 / 13',
          width: '100%',
          height: '150px'
        }}
      />
    );
  }
}

const ConnectedDrummachine = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drummachine);

export default () => (
  <AudioCtxContext.Consumer>
    {childProps => <ConnectedDrummachine {...childProps} />}
  </AudioCtxContext.Consumer>
);
