import React from "react";

export default class TextField extends React.Component {
  render() {
    return (
        <>
          <label htmlFor={this.props.name}>{this.props.label}</label>
          <input type="text"
                 className="field"
                 id={this.props.name}
                 value={this.props.value}
                 onChange={(e) => this.onChange(e)}/>
        </>
    );
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }
}