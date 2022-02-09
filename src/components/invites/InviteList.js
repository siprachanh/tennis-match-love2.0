import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { TennisMatchLove } from "../TennisMatchLove";
import { Invite } from "./Invite";
import { InviteCard } from "./InviteCard";

//import { players } from ".players/Player"
import "./Invites.css";

export const InviteList = () => {
  const [invites, setInvites] = useState([]);
  const history = useHistory();
  const currentPlayerId = parseInt(localStorage.getItem("tennis_player"));

  useEffect(() => {
   synchInvites()
  }, []);

  const synchInvites =() => {
      //send synchInvites as prop to synch, after delete--update state without fetch recalls

    fetch("http://localhost:8088/invites")
  .then((res) => res.json())
  .then((invitesfromAPI) => {
    setInvites(invitesfromAPI);
    // PlayersInvites = new variable that returns the filtered version of invitesFromAPI and sets
    //invite.playerId equal to currentPlayerId
    // once invoked, need to call function
  });
  }
  const deleteInvite = (inviteId) => {
    fetch("http://localhost:8088/invites/${inviteId}", {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:8088/invites")
        .then((res) => res.json())
        .then((invitesData) => {
          const playersInvites = invitesData.filter(
            (invite) => invite.playerId === currentPlayerId
          );
          setInvites(playersInvites);
        });
    });
  };

  return ( 
//   <>
//     {
//         invites.map((i)=> {
//             return <li className="invites_id" key={i.id}>
//             <p>
//                 Invite #{i.id} is from {i.playerId.name}--captain. Match is on {i.matchDayId.name}, {i.matchDate.timestamp}, at {i.matchTime.timestamp}. We play {i.homeStatusId.name} at 
//                 {i.courtName.name} at {i.courtLocationId.address}. See comment: {i.comment}.

//             </p>
//             {i.playerId===currentPlayerId ? <button className="btn--inviteDelete" onClick={() => deleteInvite(i.id) }>delete</button> : ""}
//         </li>
            
//         })
         
// } </> 

<>

<h2 className="invite_header">
  {" "}
  Tennis Match Love Team Match Schedule.{" "}
</h2>
<div className="container-cards">
  {invites.map((invite) => {
    return (
      <div>
        {" "}
        <InviteCard key={invite.id} invite={invite} currentPlayerId={currentPlayerId} synchInvites={synchInvites}/>
        {/* <button
          type="button"
          className="new-invite-button"
          onClick={() => {
            history.push("/invites/create");
          }}
        >
          Create a new Match Invite Card{" "}
          <Link to={"/invites/${invite.id}"}>InviteCard</Link>
          submitted by {invite.player?.name}
          <button
            className="btn--inviteDelete"
            onClick={() => deleteInvite(invite.id)}
          >
            {" "}
            Delete
          </button>
        </button> */}
      </div>
    );
  })}
</div>
</>
)
};
