import React from "react";
import TextField from "./text-field";
import RTEField from "./rte-field";

export default class Field extends React.Component {
  render() {
    if (this.props.field.type === 'text/plain') {
      return (
          <TextField value={this.props.fieldState.value}
                     name={this.props.field.name}
                     label={this.props.field.label}
                     onChange={(v) => this.setValue(v)}
                     key={this.props.field.id}/>
      );
    }

    if (this.props.field.type === 'text/xhtml') {
      return (
          <RTEField value={this.props.fieldState.value}
                    name={this.props.field.name}
                    label={this.props.field.label}
                    onChange={(v) => this.setValue(v)}
                    key={this.props.field.id}/>
      );
    }
  }

  setValue(v) {
    const fieldState = this.props.fieldState;
    fieldState.value = v;
    const fieldStateObj = {};
    fieldStateObj[fieldState.name] = fieldState;
    this.props.onChange(fieldState);
  }
}