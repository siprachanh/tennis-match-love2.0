import React, {useEffect, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import "./Invites.css"
import { useParams } from "react-router-dom"






export const InviteCardEdit = () => {
    const inviteId = useParams ();
    const [invite, updateInvite] = useState({});
    const history = useHistory();
    const getReadableDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

   
    
    useEffect(() => {
        fetch(`http://localhost:8088/invites/${inviteId}`)
        .then (res =>res.json())
        .then (inviteObj => updateInvite(inviteObj));
    }, []);


    
    
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
<main className="cardEdit--container">
        <fieldset className="inviteCard">
            <h2 className="inviteCard_title">New Match Invite to Team Players</h2>
           
           
            <label htmlFor="Captain name">Name:</label>
            <input 
            onChange={ 
                (evt) => {
                    const copy = {...invite}
                    copy.playerId.name = evt.target.value
                    updateInvite(copy)
                    
                }
            } 
            required autoFocus
            type="text" name="name"/>


            <div className="invite--day">
                <p> MatchDay: {invite?.matchDayId}</p>

                <label htmlFor="match day">Day:</label>
            <input 
            onChange={ 
                (evt) => {
                    const copy = {...invite}
                    copy.matchDate = evt.target.value
                    updateInvite(copy)
                    
                }
            } 
            type="date" id="date"

            required autoFocus
            type="text" name="name"/>

            </div>
           
            <div className="invite--date">
                <p> MatchDate: {invite?.matchDate}</p>
            
            <label htmlFor ="date">Upcoming Match Date: </label>
            <input type="date" id="match start" name="match-scheduled"
        
            
            
            onChange={
                (evt) => {
                    const copy = {...invite}
                    copy.matchDate = evt.target.value
                    updateInvite(copy)
                }
            }
            
            className="form-control"/>
            </div>

            <div className="invite--time">
                <p> MatchTime: {invite?.matchTime}</p>
            <label for="matchTime"> Our match time is: </label>
            <input type ="time" id="matchTime" name= "matchTime"
                min="09:00" max="18:00" required></input>
            </div>


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
                <button id="edit_button" type="button" onClick={() => history.push(`/invites/${invite?.id/editInvite}`)}> Edit</button>
                <button id="delete_button" type="button" onClick={() => history.push(`/invites/${invite?.id/deleteInvite}`)}> Delete My Invite </button>
              
             </section>
             <form name="invite response" method="POST" onsubmit="onSubmit()">
                 <input type="submit" name="accept" id="accept" value="Accept" onClick="acceptFunction()"></input>
            
             <input type="submit" name="reject" id="reject" value="Accept" onclick="rejectFunction()"></input>
            </form> 
        </fieldset>
        </main>
    );
}