import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { TennisMatchLove } from "./TennisMatchLove"
import "./index.css"

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
            <TennisMatchLove />
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

