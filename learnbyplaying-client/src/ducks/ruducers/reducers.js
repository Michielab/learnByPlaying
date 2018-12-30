import {
  SET_GAMEOPTIONS,
  TOGGLE_PLAYING,
  DEDUCT_POINTS,
  ADD_POINTS,
  SET_AUDIO_CONTEXT,
  TOGGLE_STEP,
  TOGGLE_PLAY,
  HANDLE_BPM_CHANGE,
  HANLE_CLEAR_ALL,
  SET_CURRENT_STEP,
  SELECT_PART,
  AMPLITUDE_CHANGE,
  MUTE_INSTRUMENT
} from '~/ducks/actions/actions';
import { combineReducers } from 'redux';
import { HANDLE_CLEAR_ALL } from '../actions/actions';

const defaultState = {
  score: 0,
  gameOptions: {
    type: 'fKeySimple',
    started: false,
    playing: false
  }
};

const session = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_POINTS:
      return {
        ...state,
        score: state.score + 25
      };
    case DEDUCT_POINTS:
      return {
        ...state,
        score: state.score - 5
      };
    case SET_GAMEOPTIONS:
      return {
        ...state,
        gameOptions: { ...action.payload.gameOptions }
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        gameOptions: {
          ...state.gameOptions,
          playing: !state.gameOptions.playing
        }
      };
    default:
      return state;
  }
};

const audioContextDefaultState = {
  drummachine: {
    playing: false,
    bpm: 130,
    currentStep: 0
  },
  beatSteps: {
    steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    partOne: { steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    partTwo: { steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    partThree: { steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    partFour: { steps: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  },
  amplitude: {
    mainGain: 100,
  },
  parts: ['partOne', 'partTwo', 'partThree', 'partFour'],
  activePart: 0,
  selectedParts: ['partOne']
};

const drummachine = (state = audioContextDefaultState, action) => {
  switch (action.type) {
    case SET_AUDIO_CONTEXT:
      return {
        ...state,
        audioContext: action.payload.audioContext
      };
    case TOGGLE_STEP:
      // let instrumentName = action.payload.instrument.instrumentName;
      // let stepsArray = [...action.payload.instrument.steps];
      // console.log(state, action.payload);
      // state.beatSteps[action.payload.part][instrumentName] = stepsArray
      return {
        ...state,
        beatSteps: action.payload.newSteps
        // beatSteps: {
        //   ...state.beatSteps
        //   // [action.payload.part] = {...state.beatSteps[action.payload.part],
        //   //   [instrumentName]: stepsArray
        //   // }
        // }
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          playing: !state.drummachine.playing
        }
      };
    case HANDLE_BPM_CHANGE:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          bpm: action.payload.bpm
        }
      };
    case HANDLE_CLEAR_ALL:
      return {
        ...state,
        beatSteps: {
          ...action.payload.beatSteps
        }
      };
    case SET_CURRENT_STEP:
      return {
        ...state,
        drummachine: {
          ...state.drummachine,
          currentStep: action.payload.currentStep
        }
      };
    case SELECT_PART:
      return {
        ...state,
        activePart: action.payload.activePart,
        selectedParts: [...action.payload.selectedParts]
      };
    case AMPLITUDE_CHANGE:
      return {
        ...state,
        amplitude: {
          ...state.amplitude,
          [action.payload.instrument]: action.payload.amplitude
        }
      };
    case MUTE_INSTRUMENT:
      let mute = state.amplitude[action.payload.instrument + 'Mute'] ? false : true;
      return {
        ...state,
        amplitude: {
          ...state.amplitude,
          [action.payload.instrument + 'Mute']: mute
        }
      };
    default:
      return state;
  }
};

export default combineReducers({
  session,
  drummachine
});
