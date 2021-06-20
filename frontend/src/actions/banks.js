import axios from "axios";
import { tokenConfig } from "./auth";
import { GET_BANKS, GET_BANKS_ITEMS } from "./types";

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

//each bank leads
export const getBankItem = (id) => (dispatch, getState) => {
  axios
    .get(`/backend/api/banks/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_BANKS_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
