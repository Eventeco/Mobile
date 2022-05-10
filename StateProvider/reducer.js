import {SET_USER, SET_ISSUES, SET_LOCATION} from '../constants/reducer';

export const initialState = {
  user: null,
  issues: [],
  userLocation: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.data,
      };
    case SET_ISSUES:
      return {
        ...state,
        issues: action.data,
      };
    case SET_LOCATION:
      return {
        ...state,
        userLocation: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
