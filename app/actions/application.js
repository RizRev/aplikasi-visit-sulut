import * as actionTypes from './actionTypes';

const changeTheme = theme => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

const changeFont = font => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

const forceTheme = force_dark => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

const changeLanguge = language => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

const changeCategory = category => {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    category,
  };
};

const changeTravel = travel => {
  return {
    type: actionTypes.CHANGE_TRAVEL,
    travel,
  };
};

const changeTourGuideLanguage = tourguide_language => {
  return {
    type: actionTypes.CHANGE_TOURGUIDE_LANGUAGE,
    tourguide_language,
  };
};

const clearTourGuideLanguage = () => {
  return {
    type: actionTypes.CLEAR_TOURGUIDE_LANGUAGE,
  };
};

const addToken = token => {
  return {
    type: actionTypes.ADD_TOKEN,
    token,
  };
};

const clearToken = () => {
  return {
    type: actionTypes.CLEAR_TOKEN,
  };
};

const addSwiper = swiper => {
  return {
    type: actionTypes.ADD_SWIPER,
    swiper,
  };
};

const clearSwiper = () => {
  return {
    type: actionTypes.CLEAR_SWIPER,
  };
};

const addMode = mode => {
  return {
    type: actionTypes.ADD_MODE,
    mode,
  };
};

const clearMode = () => {
  return {
    type: actionTypes.CLEAR_MODE,
  };
};

export const onChangeTheme = theme => dispatch => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = mode => dispatch => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = font => dispatch => {
  dispatch(changeFont(font));
};

export const onChangeLanguage = language => dispatch => {
  dispatch(changeLanguge(language));
};

export const onChangeCategory = category => dispatch => {
  dispatch(changeCategory(category));
};

export const onChangeTravel = travel => dispatch => {
  dispatch(changeTravel(travel));
};

export const onChangeTourGuideLanguage = tourguide_language => dispatch => {
  dispatch(changeTourGuideLanguage(tourguide_language));
};

export const onClearTourGuideLanguage = () => dispatch => {
  dispatch(clearTourGuideLanguage());
};

export const onAddToken = token => dispatch => {
  dispatch(addToken(token));
};

export const onClearToken = () => dispatch => {
  dispatch(clearToken());
};

export const onAddSwiper = swiper => dispatch => {
  dispatch(addSwiper(swiper));
};

export const onClearSwiper = () => dispatch => {
  dispatch(clearSwiper());
};

export const onAddMode = mode => dispatch => {
  dispatch(addMode(mode));
};

export const onClearMode = () => dispatch => {
  dispatch(clearMode());
};