import React, { Fragment, Component } from "react";
import BarChart from "./BarChart";
import PiChart from "./PieChart";
import LineChart from "./LineChart";
import TemporaryDrawer from "../leads/Drawer";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBankItem } from "../../actions/banks";

class InnerPage extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    getBankItem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getBankItem();
  }
  render() {
    return (
      <Fragment>
        <TemporaryDrawer />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <BarChart something="alwin" />
            </div>
            <div className="col-lg-6">
              <PiChart />
            </div>
          </div>
          <div className="col-lg-12">
            <LineChart />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.banks.banks,
});

export default connect(mapStateToProps, { getBankItem })(InnerPage);
