import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Invites.css";
import { Invite } from "./Invite";
import { InviteList } from "./InviteList";
import { InviteCard } from "./InviteCard";
import { getMatchDays } from "./InviteManager";

export const CreateInvite = ({ invite }) => {
  const history = useHistory();
  const date = new Date();
  const currentPlayerId = parseInt(localStorage.getItem("tennis_player"));
  const [newInvite, setInvite] = useState({
    playerId: currentPlayerId,
    matchDayId: "Sunday",
    matchDate: "",
    matchTime: "",
    homeStatusId: "home",
    courtName: "",
    courtLocationId: "",
    comment: "",
    datetime: ""


  });

  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    getMatchDays().then((data) => setWeekDays(data));
  }, []);

 
  const postInvite = (evt) => {
    evt.preventDefault();
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
      <form onSubmit={postInvite} className="cardEdit--container">
        <fieldset className="inviteCard">
          <h3 className="inviteCard_title">Our Upcoming Team Match Schedule</h3>
          <div className="invite--day">
            <label htmlFor="match day">Match Day:</label>
            <select
              onChange={(evt) => {
                const copy = { ...newInvite };
                copy.matchDayId = evt.target.value;
                setInvite(copy);
              }}
              id="day"
              required
              autoFocus
              name="name"
            >
              {weekDays.map((weekDay) => {
                return (
                  <option
                    id={`weekDay--${weekDay.id}`}
                    key={weekDay.id}
                    value={weekDay.name}
                  >
                    {weekDay.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="invite--date">
            <label htmlFor="date">Match Date: </label>
            <input
              type="date"
              id="match start"
              name="match-scheduled"
              onChange={(evt) => {
                const copy = { ...newInvite };
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
              Court Name: {invite?.courtName.name}
            </label>
            <select name="courtName">
              <option value="CenPark">Centennial Park Sportsplex</option>
              <option value="CrocPark">Crocket Park Tennis </option>
            </select>
          </section>
          <section className="invite--courtLocation">
            <label htmlFor="Court Address">Court Address:</label>
            <input
              required
              autoFocus
              type="text"
              id="captain input"
              className="form-control"
              placeholder="Input Court Address"
              onChange={(evt) => {
                const copy = { ...newInvite };
                copy.courtLocationId = evt.target.value;
                setInvite(copy);
              }}
            />
          </section>
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
                const copy = { ...newInvite };
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
          
          <button
            type="submit"
            onClick={postInvite}
            className="btn btn-primary"
          >
            {" "}
            Post Invite{" "}
          </button>
        </fieldset>
      </form>
    </>
  );
};
