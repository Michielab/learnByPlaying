import {
  SET_GAMEOPTIONS,
  TOGGLE_PLAYING,
  DEDUCT_POINTS,
  ADD_POINTS,
  SET_AUDIO_CONTEXT
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
  audioContext: undefined
}

const audio = (state = audioContextDefaultState, action) => {
  switch (action.type) {
    case SET_AUDIO_CONTEXT:
    console.log('action.payload', action.payload.audioContext)
      return {
        ...state,
        audioContext: action.payload.audioContext
      };
    default:
      return state;
  }
};

export default combineReducers({
  session,
  audio
});
