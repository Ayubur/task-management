import { TASK_ADD } from "../actionTypes";

const initialState = {
  tasks: null
};

export const taskStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_ADD:
      return {
        ...state,
        tasks: action.payload
      };

    default:
      return state;
  }
};
