import React, {Component} from 'react';
import { FormBtn } from "../../components/Form";
import Wrapper from "../../components/Wrapper";
import Header from "../../components/Header";
import "./Home.css";

class Home extends Component {
  
  isMobile = () => {
    if(window.innerWidth<=800 && window.innerHeight<=600){
      return true
    }
    else{
      return false
    }
  }

render(){
  return(
    <Wrapper>
      <Header className="home-header">
        <div>Scavenge</div>
        <p> </p>
        <div>Or</div>
        <p> </p>
        <div>Hunt</div>
      </Header>
      <form>
        <FormBtn
          className="btn"
          role="button"
          to="/create"
        >
          CREATE
        </FormBtn>
        {/* {
          this.isMobile() ? ( */}
            <FormBtn
              className="btn"
              role="button"
              to="/start"
            >
              PLAY
            </FormBtn>
            {/* ) : "" } */}
      </form>
    </Wrapper>
  )}
}

export default Home;