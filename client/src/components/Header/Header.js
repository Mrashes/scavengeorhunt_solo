import React from "react";
import "./Header.css";

const Header = props => 
    <h1 className="header-comp">{props.children}</h1>;

export default Header;