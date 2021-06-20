import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";

export class Intro extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { user } = this.props.auth;
    const percentage = 66;

    return (
      <Fragment>
        <div className="intro-title">
          Hello,{" "}
          <span>{user ? ` ${user.first_name} ${user.last_name}` : ""}</span>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="intro1">Profile 50% Completed</div>
            <div className="intro2">Keep up the good work.</div>
          </div>
          <div className="col-lg-4">
            <div className="progress">
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
          </div>
        </div>

        <div className="btn-container">
          <button className="intro-button">Connect Account</button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Intro);
