import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_LOANS } from "./types";

// Get Loans

export const getLoans = () => (dispatch, getState) => {
  axios
    .get("/backend/api/loan/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LOANS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
