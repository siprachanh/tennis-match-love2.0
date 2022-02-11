import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Invites.css";
import { Invite } from "./Invite";
import { InviteList } from "./InviteList";
import { InviteCard } from "./InviteCard";
import { getMatchDays } from "./InviteManager";
import { getCourtLocations } from "./InviteManager";
import { getCourtNames } from "./InviteManager";
import { getAllHomeStatus } from "./InviteManager";

export const CreateInvite = ({ invite }) => {
  const history = useHistory();
  const date = new Date();
  const currentPlayerId = parseInt(localStorage.getItem("tennis_player"));
  const [newInvite, setInvite] = useState({
    playerId: currentPlayerId,
    matchDayId: "Sunday",
    matchDate: 0,
    matchTime: "",
    homeStatusId: 0,
    courtName: "",
    courtLocationId: 1,
    comment: "",
    datetime: "",
  });

  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    getMatchDays().then((data) => setWeekDays(data));
  }, []);

  const [courtLocations, setCourtLocations] = useState([]);

  useEffect(() => {
    getCourtLocations().then((data) => setCourtLocations(data));
  }, []);

  const [courtNames, setCourtNames] = useState([]);

  useEffect(() => {
    getCourtNames().then((data) => setCourtNames(data));
  }, []);
  const [courtHome, setCourtHome] = useState([]);

  useEffect(() => {
    getAllHomeStatus().then((data) => setCourtHome(data));
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
          <div className="invite--homestatus">
            <label htmlFor="home status">Home or Visitor Status:</label>
            <select
              onChange={(evt) => {
                const copy = { ...newInvite };
                copy.homeStatusId = evt.target.value;
                setInvite(copy);
              }}
              id="homeStatus"
              required
              autoFocus
              name="name"
            >
              <option value={0}> We play as: </option>
              {courtHome.map((homeStatus) => (
                <option
                  id={`homeStatus--${homeStatus.id}`}
                  key={homeStatus.id}
                  value={homeStatus.id}
                >
                  {homeStatus.name}
                </option>
              ))}
            </select>
          </div>

          <div className="invite--courtName">
            <label htmlFor="courtName">Court Name:</label>
            <select
              onChange={(evt) => {
                const copy = { ...newInvite };
                copy.courtNameId = evt.target.value;
                setInvite(copy);
              }}
              id="courtName"
              required
              autoFocus
              name="name"
            >
              {courtNames.map((courtName) => {
                return (
                  <option
                    id={`courtName--${courtName.id}`}
                    key={courtName.id}
                    value={courtName.name}
                  >
                    {courtName.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="invite--courtLocation">
            <label className="court address" htmlFor="Court Address">
              Court Address:
            </label>
            <select
              onChange={(evt) => {
                const copy = { ...newInvite };
                copy.courtLocationId = evt.target.value;
                setInvite(copy);
              }}
              id="courtLocation"
              required
              autoFocus
              name="courtLocation"
            >
              {courtLocations.map((courtLocation) => {
                return (
                  <option
                    id={`courtLocation--${courtLocation.id}`}
                    key={courtLocation.id}
                    value={courtLocation.id}
                  >
                    {courtLocation.address}
                  </option>
                );
              })}
            </select>
          </div>

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
