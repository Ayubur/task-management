import { applyMiddleware, combineReducers, createStore } from "redux";
import { memberStateReducer } from "./member/memberReducer";
import { taskStateReducer } from "./tasks/taskReducer";

import thunk from "redux-thunk";

const rootReducer = combineReducers({ memberStateReducer, taskStateReducer });

const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
