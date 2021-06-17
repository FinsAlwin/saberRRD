import React, { Component, Fragment } from "react";

class Items extends Component {
  render() {
    return (
      <Fragment>
        <div className="card-body" style={{ padding: "0" }}>
          <div className="row">
            <div className="col-lg-6">
              <h4 className="card-title" style={h4}>
                {this.props.containerName}
              </h4>
            </div>
            <div className="col-lg-6">
              <h5 className="card-title" style={h5}>
                <span style={spanText}>Total Amount: </span>
                <span style={spanAmount}>{this.props.totalAmount}</span>
              </h5>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const h4 = {
  fontFamily: "Poppins",
  fontWeight: "lighter",
  padding: "10px",
};

const h5 = {
  fontFamily: "Poppins",
  fontWeight: "bold",
  padding: "10px",
  textAlign: "right",
};

const spanText = {
  fontFamily: "Poppins",
  fontWeight: "lighter",
  color: "#999999",
};

const spanAmount = {
  fontFamily: "Poppins",
  fontWeight: "lighter",
  color: "#0b9280",
};

export default Items;
