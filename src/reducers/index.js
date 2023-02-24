import { combineReducers } from "redux";
import { appReducer } from "./app";
import { serverReducer } from "./servers";
import { toastReducer } from "./toast";
import { resultsReducer } from "./results";
export const reducers = combineReducers({
  app: appReducer,
  server: serverReducer,
  toast: toastReducer,
  results: resultsReducer,
});
