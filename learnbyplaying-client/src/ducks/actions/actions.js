export const ADD_POINTS = 'ADD_POINTS';
export const DEDUCT_POINTS = 'DEDUCT_POINTS';
export const SET_GAMEOPTIONS = 'SET_GAMEOPTIONS';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';


//drummachine
export const SET_AUDIO_CONTEXT = 'SET_AUDIO_CONTEXT';
export const TOGGLE_STEP = 'TOGGLE_STEP';
export const TOGGLE_PLAY = 'TOGGLE_PLAY';
export const HANDLE_BPM_CHANGE = 'HANDLE_BPM_CHANGE';
export const HANDLE_CLEAR_ALL = 'HANDLE_CLEAR_ALL';
export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';
export const SELECT_PART = 'SELECT_PART';

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

// drummachine

export const setCurrentStep = currentStep => ({
  type: 'SET_CURRENT_STEP',
  payload: {
    currentStep
  }
});

export const toggleStep = (newSteps) => ({
  type: 'TOGGLE_STEP',
  payload: {
    newSteps
  }
});

export const togglePlay = () => ({
  type: 'TOGGLE_PLAY',
});

export const handleBPMChange = bpm => ({
  type: 'HANDLE_BPM_CHANGE',
  payload: {
    bpm: parseInt(bpm.target.value)
  }
});

export const handleClearAll = beatSteps => ({
  type: 'HANDLE_CLEAR_ALL',
  payload: {
    beatSteps
  }
});

export const selectPart = (part) => ({
  type: 'SELECT_PART',
  payload: {
    activePart: part
  }
})