import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Intro extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };
  render() {
    const { user } = this.props.auth;
    return (
      <Fragment>
        <div className="card-body">
          <h3 className="card-title" style={cardBodyh3}>
            <span>Hello,</span>
            <span style={spanName}>{user ? `${user.username}` : ""}</span>
          </h3>
          <div className="row">
            <div className="col-lg-8">
              <h5 className="card-subtitle mb-2 text-muted" style={h5}>
                Profile 50% Completed
              </h5>
              <h6 className="card-text" style={h6}>
                Keep up the good work.
              </h6>
            </div>
            <div className="col-lg-4">
              <div className="progress-card">
                <svg className="progress-ring" width="80" height="80">
                  <circle
                    className="progress-ring__circle"
                    stroke="#214795"
                    strokeWidth="8"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                  />
                  <text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    stroke="#214795"
                    strokeWidth="1px"
                    dy=".7em"
                  >
                    50%
                  </text>
                </svg>
                <input
                  className="progress_value"
                  hidden
                  disabled
                  value="50"
                  type="number"
                  step="5"
                  min="0"
                  max="100"
                  placeholder="progress"
                />
              </div>
            </div>
          </div>
          <div className="btn-container">
            <button className="button-card">Sync Accounts</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

const cardBodyh3 = {
  fontFamily: "Poppins",
  fontWeight: "bold",
};

const spanName = {
  color: "#214795",
};

const h5 = {
  color: " #214795",
  fontWeight: "bold",
  padding: "10px",
  fontFamily: "Poppins",
};

const h6 = {
  color: "#999999",
  padding: "10px",
  fontFamily: "Poppins",
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Intro);
