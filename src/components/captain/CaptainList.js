import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllCaptains } from "./CaptainManager.js";
import { getAllPlayers } from "../players/PlayerManager.js";

export const CaptainList = () => {
    const [captains, changeCaptain] = useState([]);
    const [players, setPlayers] = useState([])
    const [user, setUser] = useState()

    
    useEffect(() => {
        getAllPlayers().then((data) => setPlayers(data));
    }, []);
    const history = useHistory();

    useEffect(() => {
        getAllCaptains().then((data) => {
            changeCaptain(data);
        });
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem("tennis_player")
        setUser(players.find((player)=>{ return player.id === parseInt(userId) })
        )
    },[players]);


    
    return (
        <>
            <h2>Captain List</h2>
           
         {user?.captain ?  <button onClick={() => history.push("/invites/create")}>Create Invite</button> : "" }
          
            {captains.map((captain) => {
                return (
                    <p key={`captain--${captain.id}`}>
                        <Link to={`/captains/${captain.id}`}>{captain.name}</Link>
                    </p>
                );
            })}
        </>
    );
}; 