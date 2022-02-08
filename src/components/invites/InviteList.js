import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { TennisMatchLove } from "../TennisMatchLove";
import { Invite } from "./Invite";
import { InviteCard } from "./InviteCard";

//import { players } from ".players/Player"
import "./Invites.css"

export const InviteList = () => {
   
    const [invites, setInvites] = useState([]);
    const history = useHistory();
    const currentPlayerId = () => parseInt(localStorage.getItem("tennis_player"))
    
    useEffect(() => {
    fetch("http://localhost:8088/invites")
        .then( res => res.json())
        .then((invitesfromAPI) => {
            
            const playersInvites = invitesfromAPI.filter(
                (invite) => invite.playerId === (currentPlayerId()))

                 setInvites(playersInvites)
    // PlayersInvites = new variable that returns the filtered version of invitesFromAPI and sets
    //invite.playerId equal to currentPlayerId
    // once invoked, need to call function
    })
},
     [currentPlayerId]
);
     

   const deleteInvite = (inviteId) => {
   fetch("http://localhost:8088/invites/${inviteId}",{
       method: "DELETE"
   })
   .then(() => {
    fetch("http://localhost:8088/invites")
       .then((res) => res.json())
        .then((invitesData) => {
            const playersInvites = invitesData.filter(
       (invite) => invite.playerId === (currentPlayerId())
   )
   setInvites(playersInvites)})
   })
}

return (
    <>
    <h2 className="invite_header"> Tennis Match Love Invites page. Below are match invites. </h2>
    <div className="container-cards">
        {invites.map((invite) => {
            return <div> <InviteCard key={invite.id} invite={invite}/>
        
        <button type="button"
        className="new-invite-button"
        onClick={() => {history.push("/invites/create")}}>
            Create a new Match Invite Card <Link to={"/invites/${invite.id}"}>InviteCard</Link> 
            submitted by {invite.player?.name}
            <button className="btn--inviteDelete"
            onClick={()=> 
                deleteInvite(invite.id)}> Delete
        </button> 
    </button>
        
    </div>  
        })}
    </div>
    </>
);
}
