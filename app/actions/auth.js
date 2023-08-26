import * as actionTypes from './actionTypes';

const loginStart = login => {
  return {
    type: actionTypes.LOGIN_START,
    login,
  };
};

const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_ERROR,
  };
};

const loginStartTourGuide = loginTourGuide => {
  return {
    type: actionTypes.LOGIN_TOUR_GUIDE_START,
    loginTourGuide,
  };
};

const loginFailedTourGuide = () => {
  return {
    type: actionTypes.LOGIN_TOUR_GUIDE_ERROR,
  };
};

export const authentication = (login, isTourGuide, callback) => dispatch => {
  // Dispatch login start action based on isTourGuide flag
  if (isTourGuide) {
    dispatch(loginStartTourGuide());
  } else {
    dispatch(loginStart());
  }

  // Simulating asynchronous operation (e.g., API call) with a delay
  setTimeout(() => {
    if (login) {
      // Simulating successful login
      let data = {
        success: login,
      };

      // Dispatch login success action based on isTourGuide flag
      if (isTourGuide) {
        dispatch(loginSuccessTourGuide(data));
      } else {
        dispatch(loginSuccess(data));
      }

      if (typeof callback === 'function') {
        callback({ success: true });
      }
    } else {
      // Simulating failed login
      if (isTourGuide) {
        dispatch(loginFailedTourGuide());
      } else {
        dispatch(loginFailed());
      }

      if (typeof callback === 'function') {
        callback({ success: false });
      }
    }
  }, 500);
};
