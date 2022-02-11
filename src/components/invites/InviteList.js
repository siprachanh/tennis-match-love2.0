import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { TennisMatchLove } from "../TennisMatchLove";
import { CreateInvite } from "./CreateInvite";
import { InviteCard } from "./InviteCard";
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

<>

<h4 className="invite_header">Tennis Match Love Team Match Schedule.</h4>
<div className="container-cards">
  {invites.map((invite) => {
    return (
      <div>
        {" "}
        <InviteCard key={invite.id} invite={invite} currentPlayerId={currentPlayerId} synchInvites={synchInvites}/>
       
      </div>
    );
  })}
</div>
</>
)
};
