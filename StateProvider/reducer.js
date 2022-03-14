import {SET_USER, SET_ISSUES} from '../constants/reducer';

export const initialState = {
  user: null,
  issues: [],
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
    default:
      return state;
  }
};

export default reducer;
