import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerById } from "./CaptainManager.js";

export const Captain = () => {
    const [player, set] = useState({});
    const { playerId } = useParams();
    

    useEffect(() => {
        getPlayerById(playerId).then((data) => set(data));
    }, [playerId]);

    return (
        <>
            <section className="player">
                <h1>Captain {player.captain.Id}</h1>
                <h3 className="player__name">{player.captain.name}</h3>
                <div className="player__captain">Player: {player.specialty}</div>
            </section>
        </>
    );
};