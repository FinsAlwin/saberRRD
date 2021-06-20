import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_CREDITCARDS } from "./types";

// Get Creditcards

export const getCreditcards = () => (dispatch, getState) => {
  axios
    .get("/backend/api/creditcard/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CREDITCARDS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
