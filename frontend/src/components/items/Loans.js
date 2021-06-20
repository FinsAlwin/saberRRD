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
        <div className="card-container">
          {this.props.loans.map((loan) => (
            <Link to="/details" key={loan.id}>
              <div className="card-item">
                <div className="card-title">{loan.accountType}</div>
                <div className="card-loan-bank">{loan.providerName}</div>
                <div className="card-loan-balance">
                  {loan.balance_currency} {loan.balance_amount}
                </div>
                <div className="card-loan-due">Due Date: 10, Feb,2021</div>
                <div className="card-loan-intrest">Interest Rate 5 %</div>
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

export default connect(mapStateToProps, { getLoans })(Loans);
