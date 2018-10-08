export const ADD_POINTS = 'ADD_POINTS';
export const DEDUCT_POINTS = 'DEDUCT_POINTS';
export const SET_GAMEOPTIONS = 'SET_GAMEOPTIONS';

export const addPoints = () => ({
  type: 'ADD_POINTS'
});

export const deductPoints = () => ({
  type: 'DEDUCT_POINTS'
});

export const setGameOptions = gameOptions => ({
  type: 'SET_GAMEOPTIONS',
  payload: {
    gameOptions
  }
});
