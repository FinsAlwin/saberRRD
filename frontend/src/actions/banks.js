import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_BANKS } from "./types";

// Get Loans

export const getBanks = () => (dispatch, getState) => {
  axios
    .get("/backend/api/banks/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_BANKS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
