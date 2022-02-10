import React from "react";
import { useHistory } from "react-router-dom";
import "./Invites.css"
import { Invite } from "./Invite"



export const InviteCard = ({invite,currentPlayerId,synchInvites}) => {
    const history = useHistory();
    const getDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    
  const deleteInvite = (id) =>{
        return fetch(`http://localhost:8088/invites/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
        .then(synchInvites)
    };
 const editInvite = (id) => {
        return fetch(`http://localhost:8088/invites/${id}`),{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editInvite)
        }
    };
    return (
        <>
        <fieldset className="inviteCardContent">
            <h3 className="inviteCard_title">Our Upcoming Team Match Schedule</h3>
           
            <section className="invite--captainName">
                <p>Captain Name:{ invite?.playerId.name }</p>
                </section>
            <section className="invite--day">
                <p> MatchDay: {invite?.matchDayId}</p>
            </section>
            <section className="invite--date">
                <p> MatchDate: {invite?.matchDate}</p>
            </section>
            <section className="invite--time">
                <p> MatchTime: {invite?.matchTime}</p>
            </section>
            <section className="invite--homeStatus">
                <p> We play as: {invite?.homeStatusId.name}</p>
            </section>
            <section className="invite--courtName">
                <p> Court Name: {invite?.courtNameId?.name}</p>
                <p> Court Location: {invite?.courtLocationId.address}</p>
            </section>
            <section className="invite--comment">
                <p> {invite?.comment}</p>
            </section>

            <section className="invite--timestamp">
                <p> {getDate(invite?.timestamp)}</p>
            </section>

          
            
           
        
            <section className="invite--cardmodifiers">
                
                {invite.playerId===currentPlayerId ? <button id="edit_button" type="button" onClick={() => history.push(`/invites/edit/${invite?.id}`)}> Edit</button>: ""}
        
                <button id="delete_button" type="button" onClick={() => deleteInvite(invite.id)}> Delete My Invite </button>
             </section>
             
                
          
        </fieldset>
    
  
  
    </>
    )
}

