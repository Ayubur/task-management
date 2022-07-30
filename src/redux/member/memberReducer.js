import { MEMBER_ADD } from "../actionTypes";

const initialState = {
  members: null
};

export const memberStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_ADD:
      return {
        ...state,
        members: action.payload
      };
    default:
      return state;
  }
};
