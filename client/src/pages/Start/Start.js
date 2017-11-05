import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API"
import "./Start.css";

const GAMEIDERROR = "Game ID does not exist, Please enter a valid Game ID"
const USERNAMEERROR = "User Name exists, Please enter a new User name"

class Start extends Component {
  state = {
    username: "",
    gameId: "",
    redirect: false,
    errtextId: false,
    erruserName: false,
    routeObj: {},
    allgames: [],
    allusers: []    
  }

  componentDidMount = () => {
    API.getAllGames()
    .then(res => this.setState({allgames: res.data.map((game, i) => game.gameid)}))
    .catch(err => console.log(err))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    //event.preventDefault();
  };

  isGameidExists = () =>{
    const curgameid = this.state.gameId.trim();
    this.setState({errtextId: false, erruserName: false})        
    if(this.state.allgames.includes(curgameid)){
      API.getScoreByGameId(curgameid)
      .then(res => {
        if(this.isUserNameExists(res.data)===undefined){
          this.setState({routeObj: {
            pathname: '/game',
            state: {username: this.state.username, gameId: this.state.gameId}}, 
            errtextId: false, redirect: true})
        }      
        else{
          this.setState({routeObj: {pathname: '/start'}, erruserName: true, redirect: false})        
        }
      }).catch(err => console.log(err))     
    }
    else{      
      this.setState({routeObj: {pathname: '/start'}, errtextId: true, redirect: false})
    }

  }

  isUserNameExists = (users) => {
    const curusername = this.state.username.trim();
    return users.find((obj) => obj.name.toLowerCase()===curusername.toLowerCase())
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.state.routeObj.pathname,
        state: this.state.routeObj.state 
      }}/>)
    }
    return (
      <Wrapper>
        <Header className="start-header">
          <div>Scavenge</div>
          <p></p>
          <div>Or</div>
          <p></p>
          <div>Hunt</div>
        </Header>
        <p>{this.state.errtextId ? GAMEIDERROR : ""}</p>
        <p>{this.state.erruserName ? USERNAMEERROR : ""}</p>
        <form>
          <Input
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username (required)"
            htmlFor = "username"
            label = "Username"
          />

          <Input
            value={this.state.gameId}
            onChange={this.handleInputChange}
            name="gameId"
            placeholder="Game Id (required)"
            htmlFor = "gameid"
            label = "Game ID"
          />
          
          <FormBtn
            className="btn"
            role="button"
            onClick={this.isGameidExists}
            to={{pathname: '/start'}}
            disabled={!(this.state.username && this.state.gameId)}
          >
            Start Hunt
          </FormBtn>
        </form>
        <FormBtn 
            className="btn"
            role="button"
            to="/"
        >
            Home
        </FormBtn>
      </Wrapper>
    );
  }
}

export default Start;