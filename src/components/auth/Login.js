import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const existDialog= useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/players?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck()
    .then((exists) => {
      if (exists) {
        localStorage.setItem("tennis_player", exists.id);
        history.push("/");
      } else {
        existDialog.current.showModal()
      }
    });
  };
  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>{"User does not exist"}</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.clos()}>Close</button>
 
      </dialog>

      <section>
          <form className="form--login" onSubmit={handleLogin}>
          <h1 className="TennisMatchLove"> Welcome to Tennis Match Love</h1>
          <h2>"Please sign in"</h2>
          <fieldset> 
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              onChange={evt => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus />
            </fieldset>
            <fieldset>
            <button type="submit"> Sign In</button>
            </fieldset>
            </form>
          </section>
          
            <section className="link--register">
            <Link to="/register">
            New Player? Click Here to Create an Account
          </Link>
        </section>
    </main>
  );
};
