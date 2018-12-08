export const ADD_POINTS = 'ADD_POINTS';
export const DEDUCT_POINTS = 'DEDUCT_POINTS';
export const SET_GAMEOPTIONS = 'SET_GAMEOPTIONS';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';

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

export const togglePlaying = () => ({
  type: 'TOGGLE_PLAYING',
});

