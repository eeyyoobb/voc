import {
    SET_LOADING,
    SET_SELECTED_ICON,
    SET_DROP_DOWN_TOGGLE,
    SET_THREE_DOTS_POSITIONS,
    SET_SELECTED_QUIZ,
    SET_OPEN_ICON_BOX,
  } from '../actions/types';
  
  const initialState = {
    isLoading: true,
    selectedIcon: { faIcon: 'faQuestion' },
    dropDownToggle: false,
    threeDotsPositions: { x: 0, y: 0 },
    selectedQuiz: null,
    openIconBox: false,
  };
  
  const uiReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_LOADING:
        return { ...state, isLoading: action.payload };
      case SET_SELECTED_ICON:
        return { ...state, selectedIcon: action.payload };
      case SET_DROP_DOWN_TOGGLE:
        return { ...state, dropDownToggle: action.payload };
      case SET_THREE_DOTS_POSITIONS:
        return { ...state, threeDotsPositions: action.payload };
      case SET_SELECTED_QUIZ:
        return { ...state, selectedQuiz: action.payload };
      case SET_OPEN_ICON_BOX:
        return { ...state, openIconBox: action.payload };
      default:
        return state;
    }
  };
  
  export default uiReducer;
  