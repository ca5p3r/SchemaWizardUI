const myState = {
  quickTableResults: {},
  quickSchemaResults: {},
  detailedTableResults: {},
  detailedSchemaResults: false,
  detailedChangesCount: 0,
};

export const resultsReducer = (state = myState, action = {}) => {
  switch (action.type) {
    case "updateQuickTable":
      return {
        ...state,
        quickTableResults: action.payload,
      };
    case "updateQuickSchema":
      return {
        ...state,
        quickSchemaResults: action.payload,
      };
    case "updateDetailedTable":
      return {
        ...state,
        detailedTableResults: action.payload,
      };
    case "updateDetailedSchema":
      return {
        ...state,
        detailedSchemaResults: action.payload,
      };
    case "updateDetailedChangesCount":
      return {
        ...state,
        detailedChangesCount: action.payload,
      };
    default:
      return state;
  }
};
