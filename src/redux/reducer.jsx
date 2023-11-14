const storedMaintenance = localStorage.getItem("underMaintenance");

const initialState = {
  access: false,
  user: undefined,
  success: false,
  blocked: false,
  underMaintenance: storedMaintenance ? JSON.parse(storedMaintenance) : [],
};

const accessReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCESS":
      return {
        ...state,
        access: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "SET_BAR":
      return {
        ...state,
        blocked: action.payload,
      };
    case "SET_MAINTENANCE":
      return {
        ...state,
        underMaintenance: action.payload,
      };
    default:
      return state;
  }
};

export default accessReducer;
