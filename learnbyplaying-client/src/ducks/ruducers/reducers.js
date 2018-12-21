import {
  SET_GAMEOPTIONS,
  TOGGLE_PLAYING,
  DEDUCT_POINTS,
  ADD_POINTS,
  SET_AUDIO_CONTEXT,
  TOGGLE_STEP
} from '~/ducks/actions/actions';
import { combineReducers } from 'redux';

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
  beatSteps: {
    steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
  }
};

const drummachine = (state = audioContextDefaultState, action) => {
  switch (action.type) {
    case SET_AUDIO_CONTEXT:
      return {
        ...state,
        audioContext: action.payload.audioContext
      };
    case TOGGLE_STEP:
      console.log(action.payload)
      let instrumentName = action.payload.instrument.instrumentName;
      let stepsArray = [...action.payload.instrument.steps]
      // let beatSteps = {...state.beatSteps, [instrumentName]: stepsArray}
      return {
        ...state,
        beatSteps: {
          ...state.beatSteps,
          [instrumentName]: stepsArray
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
