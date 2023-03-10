const myState = {
  enableSSH: false,
  enableKeyAuth: false,
  enableTableCompare: false,
  isLoading: false,
  activeResultTab: "0",
};

export const appReducer = (state = myState, action = {}) => {
  switch (action.type) {
    case "triggerSSHTunnel":
      return {
        ...state,
        enableSSH: action.payload,
      };
    case "triggerKeyAuth":
      return {
        ...state,
        enableKeyAuth: action.payload,
      };
    case "triggerTableCompare":
      return {
        ...state,
        enableTableCompare: action.payload,
      };
    case "triggerIsLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "setActiveTab":
      return {
        ...state,
        activeResultTab: action.payload,
      };
    default:
      return state;
  }
};
