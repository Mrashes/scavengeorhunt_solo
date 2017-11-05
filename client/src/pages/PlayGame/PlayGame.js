import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import API from '../../utils/API.js';
import Aframe from '../Aframe';
import Wrapper from '../../components/Wrapper';
import Clue from '../../components/Clue'
import Story from '../../components/Story';
// import LocationSound from '../audio/locationAlert.mp3'

//TODO Aframe animations
    //On move
//TODO make new Chicago one for class

// Zero, Zero error
// 1) Taking me straight to the first location without showing clue, even if I am no where close, 
// 2) not starting the game when I reach the next location even though my coordinates are updating on the screen, 
// 3) clue count/turn is incrementing too many times





//PreLoad.js to cache 

//Amanda passed data
//this.props.location.state.username
//this.props.location.state.gameId

class PlayGame extends Component {
    state = {
        startTime: 0,
        currLat: 0,
        currLon: 0,
        locations: [],
        locationCounter: 0,
        destLat: 0,
        destLon: 0,
        destHint: "",
        destClick: 0,
        turn: 1,
        leaderData: [],
        redirect: false,
        endRedirect: false,
        new: true,
    }

    componentDidMount() {
        this.getGameInfo(this.props.location.state.gameId);
        this.getCurrentLocation();
    }


    //REDIRECT FUNCTIONS
    
    //Quick resolve for testing
    same = () => {
        this.setState({
            turn: this.state.turn+1,
            redirect: true
        })
    }
    done = () => {
        this.setState({
            new: false
        })
    }

    //handles redirect from aframe to this
    handleRedirect = () => {
        this.setState({
            redirect: false
        })
        this.getDestinationLocation()
    }

    //LOCATION based functions

    compareLocations = () => {
        if (this.state.locationCounter === 0) {
            this.setState({
                locationCounter: this.state.locationCounter+1
            })
        }
        else {
            //alias creation
            const destLat = this.state.destLat
            const destLon = this.state.destLon

            //makes a range of numbers for the reference
            //This only works in the Northwestern hemisphere
            // const latTruth = destLat-.0003<=this.state.currLat && this.state.currLat<=destLat+.0003
            // const lonTruth = destLon-.0003>=this.state.currLon>=destLon+.0003

            const latTruth = destLat === this.state.currLat
            const lonTruth = destLon === this.state.currLon

            if (destLat === 0) {
                console.log('redirect')
            }
            //if location comparison correct then display the aframe environment
            else if (latTruth && lonTruth) {

                //This vibrates indicating you got location
                try{window.navigator.vibrate(200);} 
                catch(e) {API.postErrors(e).catch(e => console.log(e))}

                //direct to aframe
                this.setState({
                    turn: this.state.turn+1,
                    destLat: 0,
                    destLon: 0,
                    redirect: true
                })
            }
            else {
                //Keep going
            }
        }
    }

    //Set current location based on data taken from the watch location function
    setCurrLatLon = (lat, lon) =>{
        return new Promise (
            (resolve, reject) => {
                const currlat = Math.round(1000*lat)/1000;
                const currlon = Math.round(1000*lon)/1000;
                this.setState({
                    currLat: currlat,
                    currLon: currlon
                });
                resolve()
            }
        )
    }

    //AJAX for game data
    getGameInfo = (gameid) => {
        //use gameid instead of  "MaxTest"
        API.getGame(gameid).then(res => {
            this.setState({
                locations: res.data[0].locations
            })
            // console.log(this.state.locations)
            this.getDestinationLocation();
            this.setStartTime();
        })
    }

    //This parses the locations data to return what the next destination is
    getDestinationLocation = () => {
        if (this.state.turn > this.state.locations.length){
            this.timeCompare()
        }
        else {
            // console.log('gettingDest')
            const turn = this.state.turn-1
    
            const lat = this.state.locations[turn].latitude
            const lon = this.state.locations[turn].longitude
    
            const destlat = Math.round(1000*lat)/1000;
            const destlon = Math.round(1000*lon)/1000;
    
            this.setState({
                destLat: destlat,
                destLon: destlon,
                destHint: this.state.locations[turn].clue,
                destClick: this.state.locations[turn].hitcounter
            });
        }
    }

    //sets up a watch for the position
    getCurrentLocation = () => {
        function geo_success(position) {
            this.setCurrLatLon(position.coords.latitude, position.coords.longitude)
                .then(res => this.compareLocations())
                .catch(e=>console.log(e))
        }
        
        function geo_error() {
            console.log("Sorry, no position available.");
        }
        
        const geo_options = {
            enableHighAccuracy: true,
            maximumAge        : 2000, 
            timeout           : 2000
        };

        const self = this
        
        navigator.geolocation.watchPosition(geo_success.bind(self), geo_error, geo_options)

        //binds this so I can use another function
        setInterval(function() { 
            navigator.geolocation.watchPosition(geo_success.bind(self), geo_error, geo_options); 
        }, 3000)
        
    }


    //TIME functions
    setStartTime = () => {
        const startTime = new Date();
        //getTime finds milliseconds
        this.setState({
            startTime: startTime.getTime()
        })
    }

    //This creates a new date based on the difference between the start and the end of their run
    timeCompare = () => {
        const endTime = new Date();
        const timeDiff = endTime - this.state.startTime
        const score = new Date(timeDiff)
        //This post returns the highscore data from your ID then redirects
        this.postHighScore(score).then(res => {
            this.setState({
                leaderData: res,
                endRedirect: true
            })
        })
    }

    //HIGHSCORE functions
    //Post to database the score
    postHighScore = (score) => {
        return new Promise (
            (resolve, reject) => {
                API.saveUserScore({
                    name: this.props.location.state.username,
                    hours: score.getUTCHours(),
                    minutes: score.getUTCMinutes(),
                    seconds: score.getUTCSeconds(),
                    gameid: this.props.location.state.gameId
                }).then(res => {
                    console.log(res);
                    API.getScoreByGameId(this.props.location.state.gameId)
                    .then(res => resolve(res.data))
                    .catch(e => console.log(e))
                })
                .catch(e => {
                    console.log(e);
                    API.getScoreByGameId(this.props.location.state.gameId)
                    .then(res => resolve(res.data))
                    .catch(e => console.log(e))
                })
            }
        )
    } 


    //RENDER functions
    render() {
        if(this.state.new) {
            return (
                <Story 
                    done={this.done}
                />
            )
        }
        else if (this.state.redirect) {
            return (<Aframe 
                destination={this.getDestinationLocation} 
                redirect={this.handleRedirect}
                targetClicks={this.state.destClick}
            />)
        }
        else if (this.state.endRedirect){
            return (
                <Redirect to={{
                    pathname: '/endgame',
                    state: { data: this.state.leaderData }
                  }}
                />
            )
        }
        return(
            <div>
                {
                    (this.props.location.state.gameId.endsWith('Test')) ? 
                    (<div>
                        <p>Current Coords</p>
                        <p>{this.state.currLat}</p>
                        <p>{this.state.currLon}</p>

                        <p>Destination</p>
                        <p>{this.state.destLat}</p>
                        <p>{this.state.destLon}</p>
                     </div>) : ("")
                }

                <Wrapper>
                    <Clue 
                        number={this.state.turn}
                        hint={this.state.destHint}
                        same={this.same}
                        gameId={this.props.location.state.gameId}
                    />
                </Wrapper>
            </div>
            
        )        
    }
}

export default PlayGame;
