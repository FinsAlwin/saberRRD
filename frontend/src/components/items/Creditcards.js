import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCreditcards } from "./../../actions/creditcards";

class Loans extends Component {
  static propTypes = {
    creditcards: PropTypes.array.isRequired,
    getCreditcards: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getCreditcards();
  }

  render() {
    return (
      <Fragment>
        <div className="loan-container">
          {this.props.creditcards.map((creditcard) => (
            <Link to="#" key={creditcard.id}>
              <div className="creditcard">
                <span style={span1}>{creditcard.accountType}</span>
                <br />
                <span style={span2}>Acc No: {creditcard.accountNumber}</span>
                <div className="credit-card1" style={cardImage}></div>
                <span style={span3}>
                  {creditcard.balance_currency} {creditcard.balance_amount}
                </span>
                <br />
                <span style={span4}>Due Date: **</span>
                <span style={span4}>Min Due: **</span>
              </div>
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  creditcards: state.creditcards.creditcards,
});

const span1 = {
  color: "black",
  fontSize: "16px",
  fontFamily: "Poppins",
  fontWeight: "lighter",
  padding: "10px",
};

const span2 = {
  color: "#999999",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontWeight: "lighter",
  padding: "10px",
};

const cardImage = {
  backgroundImage: "./images/card.png",
};

const span3 = {
  color: "#0b9280",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "10px",
};

const span4 = {
  color: "#d50000",
  fontSize: "10px",
  padding: "10px",
};

const span5 = {
  color: "#999999",
  fontSize: "10px",
  padding: "10px",
};

export default connect(mapStateToProps, { getCreditcards })(Loans);
