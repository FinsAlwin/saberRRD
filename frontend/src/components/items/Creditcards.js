import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCreditcards } from "./../../actions/creditcards";
import card1 from "./image/card1.png";
import card2 from "./image/card2.png";
import card3 from "./image/card3.png";

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
        <div className="card-container">
          {this.props.creditcards.map((creditcard) => (
            <Link to="#" key={creditcard.id}>
              <div className="credit-container">
                <div className="credit-title">{creditcard.providerName}</div>
                <div className="credit-accnumber">
                  Acc No: {creditcard.accountNumber}
                </div>
                <div>
                  <img className="credit-img" src={card1} alt="card" />
                </div>
                <div className="credit-blance">
                  {creditcard.balance_currency} {creditcard.balance_amount}
                </div>
                <div className="credit-footer1">Due Date: 01, Feb, 2021 </div>
                <div className="credit-footer2">Min Due: USD 300</div>
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
