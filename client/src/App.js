import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Start from './pages/Start';
import PlayGame from './pages/PlayGame'
import NewGame from './pages/NewGame';
import EndGame from './pages/EndGame';

const App = () => 
    <Router>
        <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/start" component={Start} />
            <Route exact path="/game" component={PlayGame} />
            <Route exact path="/create" component={NewGame} />
            <Route exact path="/endgame" component={EndGame} />
        </Switch>
        </div>
    </Router>;


export default App;
