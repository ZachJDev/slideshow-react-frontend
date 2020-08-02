import React, { Component } from "react";

import "./infoBar.css";

class InfoBar extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <ul className="info-list">
          <li>Artist: {this.props.artist}</li>
          <li>Title: {this.props.title}</li>
          <li>Source: {this.props.source}</li>

        </ul>
      </div>
    );
  }
}

export default InfoBar;
