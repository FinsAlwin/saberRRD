import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBanks, getBankItem } from "../../actions/banks";

class Banks extends Component {
  static propTypes = {
    banks: PropTypes.array.isRequired,
    getBanks: PropTypes.func.isRequired,
    getBankItem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getBanks();
  }

  render() {
    return (
      <Fragment>
        <div className="card-container">
          {this.props.banks.map((bank) => (
            <Link to="/details" key={bank.id}>
              <div className="card-item">
                <div className="card-title">{bank.accountType}</div>
                <div className="card-balance">
                  {bank.balance_currency}
                  {bank.balance_amount}
                </div>
                <div>
                  <span className="card-footer1">{bank.providerName}</span>
                  <span className="card-footer2">{bank.accountNumber}</span>
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

export default connect(mapStateToProps, { getBanks, getBankItem })(Banks);
