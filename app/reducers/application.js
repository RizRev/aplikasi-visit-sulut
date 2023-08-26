import * as actionTypes from '@actions/actionTypes';
const initialState = {
  theme: null,
  font: null,
  force_dark: null,
  language: null,
  category: null,
  travel: null,
  tourguide_language: [],
  token: null,
  swiper: [],
  mode: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case actionTypes.CHANGE_FONT:
      return {
        ...state,
        font: action.font,
      };
    case actionTypes.FORCE_APPEARANCE:
      return {
        ...state,
        force_dark: action.force_dark,
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case actionTypes.CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case actionTypes.CHANGE_TRAVEL:
      return {
        ...state,
        travel: action.travel,
      };
    case actionTypes.CHANGE_TOURGUIDE_LANGUAGE:
      return {
        ...state,
        tourguide_language: action.tourguide_language,
      };
    case actionTypes.CLEAR_TOURGUIDE_LANGUAGE:
      return {
        ...state,
        tourguide_language: [],
      };
    case actionTypes.ADD_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case actionTypes.CLEAR_TOKEN:
      return {
        ...state,
        token: null,
      };
    case actionTypes.ADD_SWIPER:
      return {
        ...state,
        swiper: action.swiper,
      };
    case actionTypes.CLEAR_SWIPER:
      return {
        ...state,
        swiper: [],
      };
    case actionTypes.ADD_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case actionTypes.CLEAR_MODE:
      return {
        ...state,
        mode: null,
      };
    default:
      return state;
  }
};
