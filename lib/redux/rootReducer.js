/* Instruments */

import { combineReducers } from "@reduxjs/toolkit";
import TodoReducer from "./slices/TodoSlice/TodoSlice";
export const rootReducer = combineReducers({
  //add all your reducers here
  todos: TodoReducer,
});
