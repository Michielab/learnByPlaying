export const ADD_POINTS = 'ADD_POINTS';
export const DEDUCT_POINTS = 'DEDUCT_POINTS';
export const SET_GAMEOPTIONS = 'SET_GAMEOPTIONS';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
export const SET_AUDIO_CONTEXT = 'SET_AUDIO_CONTEXT';
export const TOGGLE_STEP = 'TOGGLE_STEP';


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

export const setAudioContext = audioContext => ({
  type: 'SET_AUDIO_CONTEXT',
  payload: {
    audioContext
  }
});

export const toggleStep = instrument => ({
  type: 'TOGGLE_STEP',
  payload: {
    instrument
  }
});