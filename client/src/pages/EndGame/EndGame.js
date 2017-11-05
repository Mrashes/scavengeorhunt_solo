import React from "react";
import Wrapper from "../../components/Wrapper";
import { FormBtn } from "../../components/Form";
import "./EndGame.css"
//props.location.state.data
//score is in hours min sec, combine to show score

const EndGame = props => {
    const formatDate = date => {
        const month = date.toString().slice(5,7);
        const day = date.toString().slice(8,10);
        const year = date.toString().slice(2,4);
        return `${month}/${day}/${year}`
    }

    const formatUsername = name => {
        if(name.length < 10) {
            return name;
        }
        else {
            return `${name.slice(0,8)} ...`;
        }
    }

    return ( 
        <Wrapper>
            <h2>Game Over!</h2>
            <h3>LeaderBoard</h3>
            <table className="table leaderboard">
                <thead>
                    <tr>
                        <th className="number" scope="row">#</th>
                        <th className="name">Username</th>
                        <th className="time">Time</th>
                        <th className="date">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.location.state.data.map((user, index) => {
                        if(index < 10){
                            return (
                                <tr key={index}>
                                    <th className="number" scope="row">{index+1}</th>
                                    <td className="name">{formatUsername(user.name)}</td>
                                    <td className="time">{user.hours}:{user.minutes}:{user.seconds}</td>
                                    <td className="date">{formatDate(user.scoredate)}</td>
                                </tr>
                            )
                        } else {
                            return;
                        }
                    })}
                </tbody>
            </table>
            <FormBtn 
                className="btn"
                role="button"
                to="/"
            >
                Home
            </FormBtn>
        </Wrapper> )
}

export default EndGame;