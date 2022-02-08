import React from "react";
import { useHistory } from "react-router-dom";
import "./Invites.css"




export const InviteCard = ({invite}) => {
    const history = useHistory();
    const getReadableDate = (date) => {
        return new Date(date).toLocaleDateString();
    }
    
  const deleteInvite = (id) =>{
        return fetch(`http://localhost:8088/invites${id}`), {
            method: "DELETE"
        }
        .then(result => result.json())
    };
 const editInvite = (id) => {
        return fetch(`http://localhost:8088/invites/${editInvite.id}`),{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editInvite)
        }
    };
    return (

        <fieldset className="inviteCard">
            <h2 className="inviteCard_title">New Match Invite to Team Players</h2>
            <h3>Name: { invite?.playerId.name }</h3>
           
            <label for="name">Name:</label>
            <input type="text" name="name"/>


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

            <section className="timestamp">
                <p>{getReadableDate(invite?.timestamp)}</p>
            
            </section>
        
            <section className="invite--cardmodifiers">
                <button id="edit_button" type="button" onClick={() => history.push(`/invites/edit/${invite.id}`)}> Edit</button>
                <button id="delete_button" type="button" onClick={() => history.push(`/invites/${invite?.id/deleteInvite}`)}> Delete My Invite </button>
             </section>
        </fieldset>
        
    );
}