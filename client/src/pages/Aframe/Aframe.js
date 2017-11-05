import React, { Component } from 'react';
import ReactDOM  from 'react-dom'
import './Aframe.css';
import 'aframe';
import 'aframe-animation-component';
import API from '../../utils/API.js'
import {Entity, Scene} from 'aframe-react';
// import ShootSound from './../audio/shootSound.mp3'
import carModel from '../../media/flyingCar/model.obj';
import carMaterial from '../../media/flyingCar/materials.mtl';
import cloudModel from '../../media/Cloud/model.obj';
import cloudMaterial from '../../media/Cloud/materials.mtl';
import alienModel from '../../media/Alien/model.obj';
import alienMaterial from '../../media/Alien/materials.mtl';

//https://github.com/ngokevin/aframe-react

class Aframe extends Component {

    state = {
        color: 'red',
        shape: 'box',
        counter: 0,
        counterTarget: this.props.targetClicks,
        boxPosition: {'id':0, 'x': 0, 'y': 1, 'z': -2},
        boxRotation: {'id':0, 'x': 0, 'y': 180, 'z': 0}
        // reticle: ""
    }

    componentDidMount() {
        this.makeCamera()
        this.changeShapeProperties() 
        // this.props.destination()
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    //increment the counter at the top and move the box
    counterIncrement = () => {
        this.setState({
            counter: this.state.counter + 1
        });
        const counter = this.state.counter

        //This vibrates indicating you hit it
        //There is an error on ios devices with vibrate so I set up this try catch to mitigate problem
        try {window.navigator.vibrate(200)}
        catch (e) {
            console.log(e)
            API.postErrors(e).catch(e => console.log(e))
        }

        //move to another side
        this.moveBox()
        if (counter === this.state.counterTarget) {
            //reset counter to 0
            this.stopIt()
        }
    }

    //Randomize how the shape looks &  moves it so its not in front of the player
    changeShapeProperties = () => {
        const shape = ['box','cone','cylinder','sphere', 'torus'];
        const color = ['red', 'orange', 'yellow', 'green', 'blue'];
        const randomShape = this.getRandomInt(0, shape.length-1);
        const randomColor = this.getRandomInt(0, color.length-1);
        this.moveBox()
        this.setState({
            shape: shape[randomShape],
            color: color[randomColor]
        })
    }

    //this handles edge cases
    boxEdgeCase = (boxList, boxPos) =>  {
        //if id is zero find the biggest id
        if (boxPos["id"] === 0) {
            return boxList.length-1
        }
        //if id is biggest return zero
        else if (boxPos["id"] === boxList.length-1) {
            return 0
        }
        //if zero return the second biggest number
        else if (boxPos["id"] === 1) {
            return boxList.length-2
        }
        else {
            return boxPos['id'] - 2
        }
    }
    
    //This sucks
    moveBox = () => {
        //list of all locations of box
        const boxPosList = [{'id':0, 'x': 0, 'y': 1, 'z': -3}, {'id':1, 'x': -3, 'y': 1, 'z': 0}, {'id':2, 'x': 0, 'y': 1, 'z': 3}, {'id':3, 'x': 3, 'y': 1, 'z': 0}]

        const rotationList = [{'id':0, 'x': 0, 'y': 180, 'z': 0}, {'id':1, 'x': 0, 'y': 270, 'z': 0}, {'id':2, 'x': 0, 'y': 0, 'z': 0}, {'id':3, 'x': 0, 'y': 90, 'z': 0}]

        //current state of box
        const boxPosition = this.state.boxPosition
        //filter out current location
        const newBox = boxPosList.filter(object => object["id"] !== boxPosition["id"])
        const newRot = rotationList.filter(object => object["id"] !== boxPosition["id"])
        //find what object is the edgecase
        const forbidden = this.boxEdgeCase(boxPosList, boxPosition)
        //filter out the edge case
        const nextBox = newBox.filter(object => object["id"] !== forbidden) 
        const nextRot = newRot.filter(object => object["id"] !== forbidden)
        // find the index
        const index = this.getRandomInt(0, nextBox.length)

        this.setState({
            cloudPosition: boxPosition,
            boxPosition: nextBox[index],
            boxRotation: nextRot[index]
        });

        //cloud part
        if (this.state.counter === 0){
            return
        }
        else {
            const animation = ReactDOM.findDOMNode(this.refs.cloud)
            animation.emit('cloudReset')
        }
    }

    //this finishes the aframe game
    stopIt = () => {
        // this.props.destination()
        this.props.redirect()
    }

    //This builds the camera in the background
    makeCamera = () => {
        // facingMode environment means it'll prefer the back camera if available
        const constraints = { video: { facingMode:{exact:"environment"} } };
        
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
                var video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message); 
            }); // always check for errors at the end.
    }

    render() {
        // if (this.state.redirect) {
        //     return (<Redirect push to="/start" />)
        // }

        return(
            //https://github.com/ngokevin/aframe-react-boilerplate/blob/master/src/index.js
            <div>
                <Scene>
                    <a-assets>
                        <a-asset-item id="ship-obj" src={carModel}></a-asset-item>
                        <a-asset-item id="ship-mtl" src={carMaterial}></a-asset-item>
                        <a-asset-item id="alien-obj" src={alienModel}></a-asset-item>
                        <a-asset-item id="alien-mtl" src={alienMaterial}></a-asset-item>
                        <a-asset-item id="cloud-obj" src={cloudModel}></a-asset-item>
                        <a-asset-item id="cloud-mtl" src={cloudMaterial}></a-asset-item>
                    </a-assets>
                    {/* this.state.boxPosition */}
                    {/* For some reason you have to have the clickable object in a container to make it more effective */}
                    <Entity id="container"
                        position={this.state.boxPosition}
                        geometry={{primitive: 'box'}}
                        scale={{'x':2, 'y':2, 'z':2}}
                        rotation={this.state.boxRotation}
                        material={{transparent: false, opacity: 0}}
                        events={{click: this.counterIncrement}}>
                        <Entity id="ship"
                            obj-model="obj: #ship-obj; mtl: #ship-mtl"
                            
                            scale={{'x':2, 'y':2, 'z':2}}
                            >
                            <Entity 
                                obj-model={{obj:'#alien-obj', mtl: '#alien-mtl'}}
                                
                                scale={{'x':.25,  'y':.25, 'z':.25}}
                                rotation={{'x':0, 'y':0, 'z':0}}
                                position={{'x':0, 'y':0.038, 'z':0.038}} 
                                />
                        </Entity>
                    </Entity>
                    {/* 
                    animation__rotate={{property: 'rotation', dur: 7000, easing: 'easeInOutSine', loop: true, to: '360 360 360'}}
                    animation__rotate={{property: 'rotation', dur: 5000, easing: 'easeInOutSine', loop: true, to: '360 360 360'}} 
                    */}
                   
                    <Entity
                        ref='cloud'
                        obj-model={{obj:'#cloud-obj'}}
                        position={this.state.cloudPosition}
                        material={{color: 'white', opacity: 0}}
                        animation__opacity={{property: 'material.opacity', restartEvents:"cloudReset", startEvents:'cloud',dur:1000, from:1, to:0}}
                    />

                    <Entity primitive="a-camera" wasd-controls-enabled="false">
                        <Entity 
                            primitive="a-cursor"
                            material={{color: 'white'}}
                        />
                    </Entity>

                </Scene>

                <p className="clicks">HITS: {this.state.counter}</p>

                <video className="unselectable"></video>
            </div>
        )
    }
}

export default Aframe;
