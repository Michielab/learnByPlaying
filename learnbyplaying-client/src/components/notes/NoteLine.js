import React, { Component } from "react";
import PropTypes from "prop-types";

class NoteLine extends Component {
  render() {
    const pathData = [
      "M",
      this.props.vertices[0][0],
      this.props.vertices[0][1],
      "L",
      this.props.vertices[1][0],
      this.props.vertices[1][1]
    ].join(" ");
    return (
      <path
        d={pathData}
        vertices={this.props.vertices}
        strokeWidth="2"
        stroke="black"
      />
    );
  }
}

NoteLine.propTypes = {
  vertices: PropTypes.array
};

export default NoteLine;
