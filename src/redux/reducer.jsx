const initialState = {
    access: false,
    user: undefined,
    success: false,
  };
  
  const accessReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_ACCESS":
        return {
          ...state,
          access: action.payload,
        };
      case "SET_USER":
        return{
          ...state,
          user: action.payload
        }
        case "SET_SUCCESS":
          return {
            ...state,
            success: action.payload
          }
      default:
        return state;
    }
  };
  
  export default accessReducer;