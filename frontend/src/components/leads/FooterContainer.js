import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class FooterContainer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="row">
          <div className="col-lg-8">
            <div className="footer-box">
              <span className="footer-text">20% More Spend Than July</span>
              <span className="footer-link">
                <Link to="#">View Details</Link>
              </span>
            </div>
          </div>
          <div className="col-lg-4">
            <button className="button-footer">View Transactions</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterContainer;
