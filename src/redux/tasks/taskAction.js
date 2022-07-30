import { TASK_ADD } from "../actionTypes";

export const taskAdd = (tasks) => (dispatch) => {
  dispatch({
    type: TASK_ADD,
    payload: tasks
  });
};
