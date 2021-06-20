import { GET_BANKS_ITEMS } from "../actions/types.js";

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BANKS_ITEMS:
      return {
        ...state,
        banks: action.payload,
      };

    default:
      return state;
  }
}
