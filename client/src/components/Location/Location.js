import React from "react";
import "./Location.css";

const Location = props => 
    <label htmlFor="locationNum">Location: {props.index+1}</label>
                            
    <label htmlFor="clue">Clue</label> 
    <input 
        type="text"
        value={location.clue}
        onChange={props.handleInputChange(index)}
        name="clue"
        placeholder="Enter the Clue to identify this location (required)"
    /> 

    <label htmlFor="latitude">Latitude</label>   
    <input 
        type="number"
        value={location.latitude}
        onChange={this.handleInputChange(index)}
        name="latitude"
        placeholder="Enter the latitude for this location (required from 2nd location onwards)"
    /> 

    <label htmlFor="longitude">Longitude</label>   
    <input 
        type="number"
        value={location.longitude}
        onChange={this.handleInputChange(index)}
        name="longitude"
        placeholder="Enter the longitude for this location (required from 2nd location onwards)"
    />  

export default Location;