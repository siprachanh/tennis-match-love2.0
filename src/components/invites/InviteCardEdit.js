import React from "react";
import { useHistory } from "react-router-dom";
import "./Invites.css"
import { Invite } from "./Invite"
import { CreateInvite } from "./CreateInvite";




export const InviteCardEdit = ({invite}) => {
    const history = useHistory();
    const getDate = (date) => {
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
        <>
        <form className="cardEdit--container">
        <fieldset className="inviteCard">
            <h3 className="inviteCard_title">Our Upcoming Team Match Schedule</h3>
           
            <label htmlFor="name">Captain Name:</label>
             <input type="text" name="name"/> 
            <main className="cardEdit--container">
        <fieldset className="inviteCard">
            
            {/* <input 
            // onChange={ 
            //     (evt) => {
            //         const copy = {...invite}
            //         copy.playerId.name = evt.target.value
            //         updateInvite(copy)
                    
            //     }
            // } 
            required autoFocus
            type="text" name="name"/> */}


            <div className="invite--day">
                

                <label htmlFor="match day">Match Day:</label>
            <input 
            onChange={ 
                (evt) => {
                    const copy = {...invite}
                    copy.matchDay = evt.target.value
                    CreateInvite(copy)
                    
                }
            } 
            type="date" id="date"

            required autoFocus
            type="text" name="name"/>

            </div>
           
            <div className="invite--date">
            
            <label htmlFor ="date">Match Date: </label>
            <input type="date" id="match start" name="match-scheduled"
        
            
            
            // onChange={
            //     (evt) => {
            //         const copy = {...invite}
            //         copy.matchDate = evt.target.value
            //         updateInvite(copy)
            //     }
            // }
            
            className="form-control"/>
            </div>

            <div className="invite--time">
           
            <label htmlFor ="matchTime"> Match Start Time: </label>
            <input type ="time" id="matchTime" name= "matchTime"
                min="09:00" max="18:00" required></input>
            </div>


            <section className="invite--homeStatus">
                <label htmlFor  = "match homeStatus">We play as: {invite?.homeStatusId.name}</label>
                <input type="text" name="name"/> 
            </section>
           
            <section className="invite--courtName">
            <label htmlFor = "courtName">Court Name: {invite?.courtNameId?.name}</label>
            <input type="text" name="name"/> 
            </section>
            <section className="invite--courtLocation">
            <label htmlFor  = "courtLocation">Court Location: {invite?.courtLocationId.address}</label>
                <input type="text" name="name"/> 
            </section>
            
            <section className="invite--comment">
            <label htmlFor  = "captain's comments">Captain's Comments: {invite?.comment}</label>
            <input type="text" name="name"/> 
            </section>

            <section className="timestamp">
            <label htmlFor  ="time match schedule created"> Match Posted on: {Math.floor(Date.now() /1000)} </label>
           
            
            </section>
        
            <section className="invite--cardmodifiers">
                <button id="edit_button" type="button" onClick={() => history.push(`/invites/${invite?.id/editInvite}`)}> Edit</button>
                <button id="delete_button" type="button" onClick={() => history.push(`/invites/${invite?.id/deleteInvite}`)}> Delete My Invite </button>
             </section>
             <form name="invite response" method="POST" onSubmit="onSubmit()">
                 <input type="submit" name="accept" id="accept" value="Accept" onClick="acceptFunction()"></input>
            
             <input type="submit" name="reject" id="reject" value="Decline" onClick="rejectFunction()"></input>
            </form> 
        </fieldset>
    </main>
    </fieldset>
    </form>
    </>
    )
}
