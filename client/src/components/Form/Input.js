
import React from "react";

export const Input = props =>
  <div className="form-group">
    <label htmlFor={props.htmlFor}>{props.label}</label>
    <input className="form-control" {...props} style={{textAlign:"center"}}/>
  </div>; 