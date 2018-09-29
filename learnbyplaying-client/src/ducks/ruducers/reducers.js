import ADD_POINTS from '~/ducks/actions/actions';
import DEDUCT_POINTS from '~/ducks/actions/actions';
import { combineReducers } from 'redux';

const defaultState = {
  score: 0
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
    default:
      return state;
  }
};
export default combineReducers({
  session
});
