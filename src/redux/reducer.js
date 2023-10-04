const initialState = {
    access: false,
    user: undefined
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
      default:
        return state;
    }
  };
  
  export default accessReducer;