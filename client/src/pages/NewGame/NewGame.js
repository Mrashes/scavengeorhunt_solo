import React, {Component} from "react"
import { Redirect } from "react-router-dom"
import API from "../../utils/API"
import Button from "../../components/Button"
import Wrapper from "../../components/Wrapper"
import {FormBtn} from "../../components/Form"
import Error from "../../components/Error"
import "./NewGame.css";

const GAMEIDERROR = "Game ID Exists or Blank, Please enter a valid Game ID"
const BLANKFIELDERROR = "Fields cannot be blank, Please enter valid values"

class NewGame extends Component {
    state = {
        allgames: [],
        redirect: false,
        errtextId: false,
        errtextEmpty: false,
        game: {
                gameid: "",
                locations: [{
                    clue: "",
                    latitude: "",
                    longitude: "",
                    hitcounter: (Math.floor(Math.random()*5))+1
                }]
        },
        clueNume: 0,
    }

    componentWillMount = () => {
        API.getAllGames()
        .then(res => this.setState({allgames: res.data.map((game, i) => game.gameid)}))
        .catch(err => console.log(err))
    }

    handleGameIdChange = event => {
        const {name, value} = event.target;
        this.setState({game: {...this.state.game, [name]: value}})
    }  

    handleInputChange = (index) => event => {
        const newLocation = this.state.game.locations.map((location, i) => {
            if(i!==index)
                return location
            else{
                const {name, value} = event.target;
                return {...location, [name]: value}
            }                
        })

        this.setState({game: {...this.state.game, locations: newLocation}})

    }  
    
    handleAdd = event => {
        console.log("gameids", this.state.allgames)
        event.preventDefault();
        let game = this.state.game
        let locations = this.state.game.locations
        if(!this.isGameidExists() && !this.isEmpty()){
            console.log("not empty")
            this.setState({game: {...game, 
                                    locations: locations.concat([{
                                                                clue: "", 
                                                                latitude: "", 
                                                                longitude: "",
                                                                hitcounter: (Math.floor(Math.random()*5))+1}])}, 
            })
        }
    }

    handleDelete = (id) => event => {
        event.preventDefault()
        console.log("delete clicked"+ id)
        let game = this.state.game
        let locations = this.state.game.locations
        this.setState({game:{...game, 
                                locations: locations.filter((l, index) => index!==id)}})
    }

    handleSubmit = event => {
        event.preventDefault()
        if(!this.isGameidExists() && !this.isEmpty()){

            API.saveGame(this.state.game)
            .then(res => {
                this.setState({game: {...this.state.game, gameid: "", locations: [{clue: "", latitude: "", longitude: ""}]},
                                redirect: true})
            })
            .catch(err => console.log(err))
        }
    }

    isGameidExists = () =>{
        const curgameid = this.state.game.gameid.trim();
        let isGameid=false;
        if(this.state.allgames.includes(curgameid) || curgameid===""){
            isGameid=true;
        }
        this.setState({errtextId: isGameid})
        return isGameid;
    }

    isEmpty = () => {
        const curlocations = this.state.game.locations;
        let isBlank = false;
        curlocations.map((location, i) => {
            if(location.clue==="" || location.latitude==="" || location.longitude===""){
                isBlank=true;
            }
        })
        this.setState({errtextEmpty: isBlank})
        return isBlank;
    }

    updateClueNum = index => {
        return index + 1;
    }

    render(){
        let game = this.state.game
        if (this.state.redirect) {
            return (<Redirect to={{
              pathname: "/"
            }}/>)
          }
        return(
            
            <Wrapper>
                <Error error={this.state.errtextId ? GAMEIDERROR : ""} />
                <Error error={this.state.errtextEmpty ? BLANKFIELDERROR : ""} /> 
                <form className="location-form">
                    <div>
                        <label htmlFor="gameid"><h4 className="input-label">GameID</h4></label>
                    </div>
                    <input 
                            className="gameId-input"
                            type="text"
                            value={game.gameid}
                            onChange={this.handleGameIdChange}
                            name="gameid"
                            placeholder="Game ID (required)"
                    />                    
                    {game.locations.map((location, index) => (
                        <div key={index}>
                            <div>
                                <label htmlFor="locationNum"><h4 className="input-label">Location: {index+1}</h4></label>
                            </div>
                            
                            <div className="one-third">
                                <div>
                                    <label htmlFor="clue">Clue</label>
                                </div>
                                <input 
                                    className="input"
                                    type="text"
                                    value={location.clue}
                                    onChange={this.handleInputChange(index)}
                                    name="clue"
                                    placeholder="Clue for this location (required)"
                                />
                            </div>

                            <div className="one-third">
                                <div>
                                    <label htmlFor="latitude">Latitude</label>
                                </div>
                                <input 
                                    className="input"
                                    type="number"
                                    value={location.latitude}
                                    onChange={this.handleInputChange(index)}
                                    name="latitude"
                                    placeholder="Latitude for this location (required)"
                                /> 
                            </div>
                            <div className="one-third">
                                <div>
                                    <label htmlFor="longitude">Longitude</label>  
                                </div> 
                                <input 
                                    className="input"
                                    type="number"
                                    value={location.longitude}
                                    onChange={this.handleInputChange(index)}
                                    name="longitude"
                                    placeholder="Longitude for this location (required)"
                                />
                            </div> 
                            {(index>0) ? (<Button onClick={this.handleDelete(index)}>X</Button>) : ("") }
                        </div>
                    ))}                         
                    <Button onClick = {this.handleAdd}>
                        Add Location
                    </Button>  
                    <Button onClick = {this.handleSubmit}>
                        Submit
                    </Button>                                                  
                </form>
                <p>To get Latitude/Longitude for a location in <a className="glink" href="https://www.google.com/maps" target="_new">Google maps</a>, right click and select what's here</p>
                <div>
                    <FormBtn 
                        className="btn"
                        role="button"
                        to="/"
                    >
                        Home
                    </FormBtn>  
                </div>  
            </Wrapper>
        )
    }
}

export default NewGame;