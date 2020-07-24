import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

const AllPlayers = () => {
    const [players, setPlayers] = useState([]);

    const getAll = () => {
        axios.get("http://localhost:8000/api/players")
            .then(response => {
                let allPlayers = response.data.results;
                allPlayers.sort((a, b) => a.name.localeCompare(b.name));
                setPlayers(allPlayers);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAll();
    }, []);

    const deleteHandler = (e, id, name) => {
        if (window.confirm(`Are you sure you want to remove ${name}?`)) {
            axios.delete(`http://localhost:8000/api/players/${id}`)
                .then(response => {
                    if (response.data.message === "success") {
                        getAll();
                    }
                })
                .catch(err => console.log(err));
            }

    }

    return (
        <div style={{border: "1px solid black", width: "970px", marginTop: "20px", padding: "20px"}}>
            <p>List | <Link to="/players/addplayer">Add Player</Link></p>
            
            <table className="table-bordered" style={{marginTop: "20px"}}>
                <tr>
                    <th style={{padding: "10px"}}>Player Name</th>
                    <th style={{padding: "10px"}}>Preferred Position</th>
                    <th style={{padding: "10px"}}>Actions</th>
                </tr>
                {
                    players.map((player, i) =>
                        <tr key={i}>
                            <td style={{padding: "10px"}}><Link to={`/players/${player._id}`}>{player.name}</Link></td>
                            <td style={{padding: "10px"}}>{player.position}</td>
                            <td>
                                <button className="btn btn-danger m-2" onClick={e => deleteHandler(e, player._id, player.name)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default AllPlayers
