import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Invites.css";
import { Invite } from "./Invite";
import { InviteList } from "./InviteList";
import { InviteCard } from "./InviteCard";

export const CreateInvite = ({ invite }) => {
  const history = useHistory();
  const date = new Date();
  const currentPlayerId = parseInt(localStorage.getItem("tennis_player"));
  const [newInvite, setInvite] = useState({ playerId: currentPlayerId });

  // const [invite, updateInvite] = useState({

  // })
  const postInvite = () => {
    fetch(`http://localhost:8088/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvite),
    }).then(() => {
      history.push("/invites");
    });
  };

  const deleteInvite = (id) => {
    return (
      fetch(`http://localhost:8088/invites${id}`),
      {
        method: "DELETE",
      }.then((result) => result.json())
    );
  };
  const editInvite = (id) => {
    return (
      fetch(`http://localhost:8088/invites/${editInvite.id}`),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editInvite),
      }
    );
  };

  // const [courtLocations, selectCourtLocations]= useState([])
  // const handleCourtLocations = () => {
  //     fetch(("http://http://localhost:8088/invites?_expand=courtLocationId" )
  //     .then(data => data.json())
  //     .then( courtLocations => selectCourtLocations(courtLocations))
  //     )};

  // useEffect(() => {
  //     handleCourtLocations();
  // },[])

  return (
    <>
      <form className="cardEdit--container">
        <fieldset className="inviteCard">
          <h3 className="inviteCard_title">Our Upcoming Team Match Schedule</h3>
              <div className="invite--day">
                <label htmlFor="match day">Match Day:</label>
                <input
                  onChange={(evt) => {
                    const copy = { ...invite };
                    copy.matchDay = evt.target.value;
                    setInvite(copy);
                  }}
                  type="date"
                  id="date"
                  required
                  autoFocus
                  type="text"
                  name="name"
                />
              </div>

              <div className="invite--date">
                <label htmlFor="date">Match Date: </label>
                <input
                  type="date"
                  id="match start"
                  name="match-scheduled"
                  onChange={(evt) => {
                    const copy = { ...invite };
                    copy.matchDate = evt.target.value;
                    setInvite(copy);
                  }}
                  className="form-control"
                />
              </div>

              <div className="invite--time">
                <label htmlFor="matchTime"> Match Start Time: </label>
                <input
                  type="time"
                  id="matchTime"
                  name="matchTime"
                  min="09:00"
                  max="18:00"
                  required
                ></input>
              </div>

              <section className="invite--homeStatus">
                <label htmlFor="match homeStatus">
                  We play as: {invite?.homeStatusId.name}
                </label>
                <select name="homeStatus">
                  <option value="home">home</option>
                  <option value="visitor">visitor</option>
                </select>
              </section>

              <section className="invite--courtName">
                <label htmlFor="courtName">
                  Court Name: {invite?.courtNameId?.name}
                </label>
                <select name="court Name">
                  <option value="CenPark">Centennial Park Sportsplex</option>
                  <option value="CrocPark">Crocket Park Tennis </option>
                </select>
              </section>
              <section className="invite--courtLocation">
                <label htmlFor="courtLocation">Court Address:</label>
                {/* <select name={courtLocation}
                id={courtLocations}
                onChange={
                    (evt)=> {
                    const copy ={...invite}
                    copy.courtLocationId = evt.target.value
            //         CreateInvite(copy)
            //     }
            // }> */}
                {/* //     <option value={0}>Select Tennis Court Address</option>
            //     {courtLocations.map((courtLocation)=>
                 */}
                {/* //     <option id={`courtLocation--${courtLocation.id}`} key={courtLocation.id} value={courtLocation.id}>
            //         {courtLocation.address}</option>)}
            //    </select> */}
              </section>

              <section className="invite--comment">
                <label className="captain's comments" htmlFor="comment">
                  Captain's Comment:
                </label>
                <input
                  required
                  autoFocus
                  type="text"
                  id="comment"
                  className="form-control"
                  placeholder="Captain's Comments for this match"
                  onChange={(evt) => {
                    const copy = { ...invite };
                    copy.comment = evt.target.value;
                    setInvite(copy);
                  }}
                />
              </section>

              <section className="timestamp">
                <label htmlFor="time match schedule created">
                  {" "}
                  Match Posted on: {Math.floor(Date.now() / 1000)}{" "}
                </label>
              </section>

              <section className="invite--cardmodifiers">
                <button
                  id="edit_button"
                  type="button"
                  onClick={() => history.push(`/invites/${invite?.id}`)}
                >
                  {" "}
                  Edit
                </button>
                <button
                  id="delete_button"
                  type="button"
                  onClick={() => history.push(`/invites/${invite?.id}`)}
                >
                  {" "}
                  Delete My Invite{" "}
                </button>
              </section>
              {/* <form name="invite response" method="POST" onSubmit="onSubmit()">
                 <input type="submit" name="accept" id="accept" value="Accept" onClick="acceptFunction()"></input>
            
             <input type="submit" name="reject" id="reject" value="Decline" onClick="rejectFunction()"></input>
            </form>  */}
           
            <button onClick={postInvite} className="btn btn-primary">
              {" "}
              Post Invite{" "}
            </button>
        
        </fieldset>
      </form>
    </>
  );
};
