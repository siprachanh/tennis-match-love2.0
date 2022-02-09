import React, { useState, useEffect} from "react";
import { getAllPlayers }  from "./PlayerManager.js"

export const PlayerList = () => {
    const [players, setPlayers] = useState([])
    const [totalPlayers, updateMsg] = useState("")
    
    useEffect(() => {
        getAllPlayers().then((data) => setPlayers(data));
    }, []);



    useEffect(() => {
        if(players.length===1) {
            updateMsg("You have 1 player");
        } else{
            updateMsg(`You have ${players.length} players`);
        }
        }, [players]);


        return (
            <>
            <h3> Player List </h3>
            <div> {totalPlayers}</div>
            {players.map ((player)=> (
                <p key={`player--${player.id}`}>{player.name}</p>
            ))}
            </>
        );
     };















