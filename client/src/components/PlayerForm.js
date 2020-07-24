import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

const PlayerForm = props => {
    const { action } = props;
    const [newPlayer, setNewPlayer] = useState({
        name: "",
        position: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        position: "",
        disabled1: true,
        disabled2: true
    });

    useEffect(() => {
        if (action === "edit") {
            axios.get(`http://localhost:8000/api/players/${props.id}`)
                .then(response => {
                    if (response.data.message === "success") {
                        setNewPlayer(response.data.results);
                    } else {
                        navigate("/players/list");
                    }
                })
        }
    }, []);

    const submitHandler = e => {
        e.preventDefault();
        if (validate(newPlayer)) {
            if (action === "edit") {
                axios.put(`http://localhost:8000/api/players/${props.id}`, newPlayer)
                    .then(response => {
                        if (response.data.message === "success") {
                            navigate("/players/list");
                        }
                    })
                    .catch(err => console.log(err));
            } else if (action === "create" ){
                axios.post(`http://localhost:8000/api/players`, newPlayer)
                    .then(response => {
                        if (response.data.message === "success") {
                            navigate("/players/list");
                        }
                    })
                    .catch(err => console.log(err));
            }
        } 
    }

    const changeHandler = e => {
        const curPlayer = {
            ...newPlayer,
            [e.target.name]: e.target.value
        }
        validate(curPlayer);
        setNewPlayer(curPlayer);
    }

    const validate = player => {
        let valid = false;
        let {...curErrors} = errors;

        if (player.name.length === 0) {
            curErrors.name = "Player name is required.";
            curErrors.disabled1 = true;
        } else if (player.name.length < 2) {
            curErrors.name = "Player name must be at least 2 characters.";
            curErrors.disabled1 = true;
        } else {
            curErrors.name = "";
            curErrors.disabled1 = false;
            valid = true;
        }

        if (player.position.length < 2 && player.position.length != 0) {
            curErrors.position = "Preferred position must be at least 2 characters."
            valid = false;
            curErrors.disabled2 = true;
        } else {
            curErrors.position = "";
            curErrors.disabled2 = false;
            valid = true;
        }

        setErrors(curErrors);

        return valid;
    }
    return (
        <div style={{border: "1px solid black", width: "970px", marginTop: "20px", padding: "20px"}}>
            <p><Link to="/players/list">List</Link> | Add Player</p>

            <div style={{border: "1px solid black", width: "930px", marginTop: "20px", padding: "20px"}}>
                {
                    action === "edit" ?
                    <h4>Edit Player</h4>
                    :
                    <h4>Add Player</h4>
                }
                <form onSubmit={ submitHandler }>

                    <label htmlFor="name" className="col-sm-5  m-2">Player Name: </label> 
                    {
                        errors.name ?
                        <p className="text-danger">{ errors.name }</p>
                        :
                        ''
                    }
                    <input type="text" name="name" onChange= { changeHandler } value={newPlayer.name} className="col-sm-10  m-2"/>

                    <label htmlFor="position" className="col-sm-5  m-2">Preferred Position: (optional) </label>
                    {
                        errors.position ?
                        <p className="text-danger">{ errors.position }</p>
                        :
                        ""
                    }
                    <input type="text" name="position" onChange={ changeHandler } value={newPlayer.position} className="col-sm-10  m-2"/> <br/>
                    {

                        action === "edit" ?
                        <div>
                            <button onClick={e => navigate("/players/list")} className="col-sm-5 btn btn-secondary m-2">Cancel</button>
                            <input type="submit" value="EDIT" className="col-sm-5 btn btn-primary m-2" disabled={ errors.disabled1 || errors.disabled2  ? true : false}/>
                        </div>
                        :
                        <input type="submit" value="ADD" className="col-sm-10 btn btn-primary m-2" disabled={ errors.disabled1 || errors.disabled2 ? true : false}/>
                    }
                    {/* <input type="submit" value="ADD" className="col-sm-9 btn btn-primary m-2"/> */}
                </form>
            </div>
        </div>
    )
}

export default PlayerForm
