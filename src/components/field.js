import React from "react";
import TextField from "./text-field";
import RTEField from "./rte-field";

export default function Field(props) {

  if (props.field.type === 'text/plain') {
    return (
        <TextField value={props.value}
                   name={props.field.name}
                   label={props.field.label}
                   key={props.field.id}
                   id={props.field.id}
                   onChange={ v => props.onChange(v)}/>
    );
  }

  if (props.field.type === 'text/xhtml') {
    return (
        <RTEField value={props.value}
                  name={props.field.name}
                  label={props.field.label}
                  onChange={(v) => props.onChange(v)}
                  key={props.field.id}/>
    );
  }

  return (
      <span className="error">No field defined for content type: <i>{props.field.type}</i></span>
  );
}