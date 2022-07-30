import { MEMBER_ADD } from "../actionTypes";

export const memberAdd = (member) => (dispatch) => {
  dispatch({
    type: MEMBER_ADD,
    payload: member
  });
};
