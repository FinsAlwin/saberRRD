import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBanks } from "../../actions/banks";

class Banks extends Component {
  static propTypes = {
    banks: PropTypes.array.isRequired,
    getBanks: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getBanks();
  }

  render() {
    return (
      <Fragment>
        <div className="card-container">
          {this.props.banks.map((bank) => (
            <Link to="#" key={bank.id}>
              <div className="bank-box">
                <div style={typeAcc}>{bank.accountType}</div>
                <div style={bankName}>{bank.providerName}</div>
                <div style={balance}>
                  {bank.balance_currency}
                  {bank.balance_amount}
                </div>
                <div className="row">
                  <div className="col-lg-5">
                    <div className="inner-footer">{bank.providerName}</div>
                  </div>
                  <div className="col-lg-6">
                    <div className="inner-footer">{bank.accountNumber}</div>
                  </div>
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
  banks: state.banks.banks,
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

export default connect(mapStateToProps, { getBanks })(Banks);
