import React from "react";
import "./Clue.css";
import Button from "../Button";

const Clue = props => 
    <div className="clue-wrapper">
        <div>
            <h1 className="clue-inner">Clue #{props.number}</h1>
            <p>{props.hint}</p>
            {
                (props.gameId.endsWith('Test') || props.gameId.endsWith('Wrigley')) ? 
                    (<Button onClick={props.same}> Skip To Location </Button>) : ("")
            }
        </div>
    </div>;

export default Clue;