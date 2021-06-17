import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLoans } from "../../actions/loans";

class Loans extends Component {
  static propTypes = {
    loans: PropTypes.array.isRequired,
    getLoans: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getLoans();
  }

  render() {
    return (
      <Fragment>
        <div className="loan-container">
          {this.props.loans.map((loan) => (
            <Link to="#" key={loan.id}>
              <div className="loan-box">
                <div style={typeAcc}>{loan.accountType}</div>
                <div style={bankName}>{loan.providerName}</div>
                <br />
                <div style={balance}>
                  {loan.balance_currency}
                  {loan.balance_amount}
                </div>
                <div style={duedate}>Due Date:***</div>
                <div style={intrest}>
                  Interest Rate Type : {loan.interestRateType}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  loans: state.loans.loans,
});

const typeAcc = {
  color: "black",
  fontSize: "16px",
  fontFamily: "Poppins",
  padding: "10px",
};

const bankName = {
  color: "#7b7b7b",
  fontFamily: "Poppins",
  fontSize: "12px",
  paddingLeft: "10px",
};

const balance = {
  color: "#0b9280",
  fontFamily: "Poppins",
  fontSize: "16px",
  paddingLeft: "10px",
  fontWeight: "bold",
};

const duedate = {
  color: "#d50000",
  fontFamily: "Poppins",
  fontSize: "12px",
  paddingLeft: "10px",
  paddingTop: "10px",
};

const intrest = {
  color: "#7b7b7b",
  fontFamily: "Poppins",
  fontSize: "12px",
  paddingLeft: "10px",
};

export default connect(mapStateToProps, { getLoans })(Loans);
