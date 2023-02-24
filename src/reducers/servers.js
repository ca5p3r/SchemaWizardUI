const myState = {
  serverList: [],
};

export const serverReducer = (state = myState, action = {}) => {
  const serverList = state.serverList;
  switch (action.type) {
    case "addServer":
      return {
        ...state,
        serverList: [...serverList, action.payload],
      };
    default:
      return state;
  }
};
