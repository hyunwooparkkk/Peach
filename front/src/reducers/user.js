import { REG_EMAIL } from "./types/actiontypes";

const initialState = {
  email: "",
};

const registeremailReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_EMAIL:
      return {
        ...state,
        email: action.inputemail,
      };
    default:
      return state;
  }
};
export default registeremailReducer;
