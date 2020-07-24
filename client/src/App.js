import React from 'react';
import { Router, Link } from '@reach/router'
import './App.css';
import AllPlayers from './components/AllPlayers';
import PlayerForm from './components/PlayerForm';


function App() {
  return (
    <div>
      <nav>
        <Link to="/players/list">Manage Players</Link> |&nbsp;
        <Link to="/status/game/1">Manage Player Status</Link>
        <Router>
          <AllPlayers path="/players/list" />
          <PlayerForm path="/players/addplayer" action="create"/>
          <PlayerForm path="/players/:id" action="edit"/>
        </Router>
      </nav>
      
    </div>
  );
}

export default App;
