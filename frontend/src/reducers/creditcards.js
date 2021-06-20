import { GET_CREDITCARDS } from "../actions/types.js";

const initialState = {
  creditcards: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CREDITCARDS:
      return {
        ...state,
        creditcards: action.payload,
      };
    default:
      return state;
  }
}
