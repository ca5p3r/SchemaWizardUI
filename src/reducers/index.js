import { combineReducers } from "redux";
import { appReducer } from "./app";
import { serverReducer } from "./servers";
import { toastReducer } from "./toast";

export const reducers = combineReducers({
  app: appReducer,
  server: serverReducer,
  toast: toastReducer,
});
