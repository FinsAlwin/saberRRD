import React, { Component, Fragment } from "react";
import "./dashboard.css";
import Intro from "./Intro";
import Items from "./Item";
import Loans from "../items/Loans";
import Creditcards from "../items/Creditcards";
import Banks from "../items/Banks";
import FooterContainer from "./FooterContainer";
import FooterLoan from "./FooterLoan";

import { getBanks } from "../../actions/banks";
import { getLoans } from "../../actions/loans";
import { getCreditcards } from "../../actions/creditcards";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TemporaryDrawer from "../leads/Drawer";
import Header from "../layout/header";

class Dashboard extends Component {
  static propTypes = {
    banks: PropTypes.array.isRequired,
    getBanks: PropTypes.func.isRequired,
    creditcards: PropTypes.array.isRequired,
    getCreditcards: PropTypes.func.isRequired,
    loans: PropTypes.array.isRequired,
    getLoans: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getBanks();
    this.props.getCreditcards();
    this.props.getLoans();
  }

  onSubmit = (e) => {
    e.preventDefault();
    window.location.replace("http://127.0.0.1:8000/fastlink/");
  };

  render() {
    const { banks } = this.props.banks;

    if (this.props.banks != "") {
      return (
        <Fragment>
          <Header />
          <TemporaryDrawer />
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="card" style={card}>
                  <Intro />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card" style={card}>
                  <Items containerName="My Accounts" totalAmount="$12000" />
                  <Banks />
                  <FooterContainer />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card" style={card}>
                  <Items containerName="Credit Cards" totalAmount="$8000" />
                  <Creditcards />
                  <FooterContainer />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card" style={card}>
                  <Items containerName="Loans" totalAmount="$5000" />
                  <Loans />
                  <FooterLoan />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div className="container" style={container}>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <button id="btn_fast" type="submit" className="btn btn-primary">
                  Connect Your Account
                </button>
              </div>
            </form>
          </div>
          <div id="box-fastlink"></div>
        </Fragment>
      );
    }
  }
}

const container = {
  textAlign: "center",
  width: "500px",
  height: "500px",
  paddingTop: "100px",
};

const card = {
  borderRadius: "16px",
  borderColor: "#f2f2f2",
  borderStyle: "solid",
  marginTop: "10px",
};

const mapStateToProps = (state) => ({
  banks: state.banks.banks,
  loans: state.loans.loans,
  creditcards: state.creditcards.creditcards,
});

export default connect(mapStateToProps, { getBanks, getCreditcards, getLoans })(
  Dashboard
);
