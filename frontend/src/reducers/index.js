import { combineReducers } from "redux";
import leads from "./leads";
import auth from "./auth";
import loans from "./loans";
import creditcards from "./creditcards";
import banks from "./banks";
import items from "./items";

export default combineReducers({
  leads,
  auth,
  loans,
  creditcards,
  banks,
  items,
});
