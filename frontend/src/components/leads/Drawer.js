import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SettingsIcon from "@material-ui/icons/Settings";
import LockIcon from "@material-ui/icons/Lock";
import FaceSharpIcon from "@material-ui/icons/FaceSharp";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";
import logo from "./media/logo1.png";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export function TemporaryDrawer(props) {
  const { user } = props.auth;
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
      <ul className="side-ul">
        <li>
          <Link to="/">
            <img className="logo" src={logo} />
            <span className="logo-text">Saber</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <div className="side-container">
              <DashboardRoundedIcon style={{ fontSize: 14 }} />

              <span className="side-name">Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <div className="side-container">
              <AccountCircleIcon style={{ fontSize: 14 }} />

              <span className="side-name">My Account</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <div className="side-container">
              <CreditCardIcon style={{ fontSize: 14 }} />

              <span className="side-name">Credit Cards</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <div className="side-container">
              <CalendarTodayIcon style={{ fontSize: 14 }} />

              <span className="side-name">Reminders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <div className="side-container">
              <ShowChartIcon style={{ fontSize: 14 }} />

              <span className="side-name">Loans</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <div className="side-container">
              <SettingsIcon style={{ fontSize: 14 }} />

              <span className="side-name">Settings</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="#" onClick={props.logout}>
            <div className="side-container">
              <LockIcon style={{ fontSize: 14 }} />

              <span className="side-name">Logout</span>
            </div>
          </Link>
        </li>
        <Divider />
        <li>
          <div className="profile-div">
            Profile <PersonIcon style={{ fontSize: 24 }} />
          </div>
        </li>
        <Divider />

        <li>
          <div className="user-name">
            Name : <span>{user ? ` ${user.first_name}` : ""}</span>
          </div>
        </li>
        <li>
          <div className="user-name">
            email : <span>{user ? ` ${user.email}` : ""}</span>
          </div>
        </li>
        <Link to="#">
          <div className="side-container">
            <EditIcon style={{ fontSize: 14 }} />

            <span className="side-name">Edit</span>
          </div>
        </Link>
      </ul>
    </div>
  );

  return (
    <div>
      {[<FaceSharpIcon style={{ color: "#214795", fontSize: 40 }} />].map(
        (anchor) => (
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
        )
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(TemporaryDrawer);
