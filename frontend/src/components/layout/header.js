import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../leads/media/logo1.png";
import Badge from "@material-ui/core/Badge";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Fragment>
        <div className="nav-bar">
          <div className="container">
            <span className="logo-top">
              <img src={logo} />
            </span>
            <span className="notification">
              <Badge badgeContent={4} color="error">
                <NotificationsActiveIcon style={{ color: "#214795" }} />
              </Badge>
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
