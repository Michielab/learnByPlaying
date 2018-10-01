import { ADD_POINTS } from '~/ducks/actions/actions';
import { DEDUCT_POINTS } from '~/ducks/actions/actions';
import { SET_GAMEOPTIONS } from '~/ducks/actions/actions';
import { combineReducers } from 'redux';

const defaultState = {
  score: 0,
  gameOptions: {
    type: 'fKeySimple',
    started: true
  }
};

const session = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return {
        ...state,
        score: state.score + 25
      };
    case 'DEDUCT_POINTS':
      return {
        ...state,
        score: state.score - 5
      };
    case 'SET_GAMEOPTIONS':
      return {
        ...state,
        gameOptions: { ...action.value }
      };
    default:
      return state;
  }
};
export default combineReducers({
  session
});
