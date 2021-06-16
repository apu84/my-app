import React from "react";

export default function TextField(props) {

  return (
      <>
        <label htmlFor={props.name}>{props.label}</label>
        <input type="text"
               className="field"
               key={props.id}
               value={props.value}
               onChange={(e) => {
                  props.onChange(e.target.value)
               }}/>
      </>
  );

}