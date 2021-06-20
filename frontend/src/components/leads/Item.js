import React, { Component, Fragment } from "react";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

class Items extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-sm-4">
            <div className="title">{this.props.containerName}</div>
          </div>

          <div className="col-sm-8">
            <div className="balance">
              <MonetizationOnIcon style={{ color: "#999999", fontSize: 20 }} />
              Account Balance: <span>{this.props.totalAmount}</span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Items;
