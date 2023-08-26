import * as actionTypes from '@actions/actionTypes';

const initialState = {
  login: {
    token: null,
    user: null,
    success: false,
  },
  login: {
    
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...action.login,
          success: true,
        },
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        login: {
          token: null,
          user: null,
          success: false,
        },
      };
    default:
      return state;
  }
};
