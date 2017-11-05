import React from "react";
import Button from "../Button";
import "./Story.css";

const Story = props => 
    <div>
        <h1 className="header">Directions</h1>
        <div className="directions">
            <p>
                In a world, where society is at a boiling point... the last thing we needed was aliens in flying cars! 
                Hunt the invaders, survive the onslaught, think OUTSIDE THE BOX.
            </p>
            <p>
                Use your alien sensing scope to defeat the emeny (line up the scope and click). 
                But beware, it may take more than one shot, and they jump around when injured!
                Upon success, you will be given a clue for your next destination. 
            </p>
            <p>
                Good Luck Hunting!
            </p>
        </div>
        <Button onClick={props.done}> Done </Button>
    </div>;

export default Story;