import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";

export const FormBtn = props =>
    <Link {...props} >
        {props.children}
    </Link>;
