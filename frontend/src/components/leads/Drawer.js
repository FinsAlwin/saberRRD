import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import dashboard from "./media/dashboard.png";
import account from "./media/account.png";
import { default as lg } from "./media/logout.png";
import setting from "./media/setting.png";
import "./dashboard.css";
import { logout } from "../../actions/auth";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ul className="sidebar-nav">
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={dashboard} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="#" style={{ textDecoration: "none" }}>
            <img src={account} />
            My Accounts
          </Link>
        </li>
        <li>
          <Link to="#" style={{ textDecoration: "none" }}>
            <img src={dashboard} />
            Credit Cards
          </Link>
        </li>
        <li>
          <Link to="#" style={{ textDecoration: "none" }}>
            <img src={dashboard} />
            Reminders
          </Link>
        </li>
        <li>
          <Link to="#" style={{ textDecoration: "none" }}>
            <img src={dashboard} />
            Loans
          </Link>
        </li>
        <li>
          <Link to="#" style={{ textDecoration: "none" }}>
            <img src={setting} />
            Settings
          </Link>
        </li>
        <li>
          <Link to="#" style={{ textDecoration: "none" }}>
            <img src={lg} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div>
      {["OPEN"].map((anchor) => (
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={"left"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
