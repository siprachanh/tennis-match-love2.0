import React, {useState, useEffect} from "react";
import "./Invites.css";
import { useHistory } from "react-router-dom";

export const Invite = ({deleteInvite}) => {
    const [invite, setInvites] = useState([])
    const currentUserId = parseInt(localStorage.getItem("tennis_player"))
    const history = useHistory()
    const [newinvite, setInvite] = useState({
        playerId: parseInt(localStorage.getItem("tennis_player")),
        matchDayId: parseInt(localStorage.getItem("tennis_player")),
        matchDate:  "",
        matchTime: "",
        homeStatusId: parseInt(localStorage.getItem("tennis_player")),
        courtName: parseInt(localStorage.getItem("tennis_player")),
        courtLocationId: parseInt(localStorage.getItem("tennis_player")),
        comment: "",
        datePosted: ""

    })
    const date = Date.now()
    const submitPost = (evt) => {
        evt.preventDefault()

        const newInvite = {
        playerId: currentUserId,
        matchDayId: parseInt(invite.matchDayId),
        matchDate:  parseInt(invite.matchDate),
        matchTime: parseInt(invite.matchTime),
        homeStatusId: parseInt(invite.homeStatusId),
        courtName: parseInt(invite.courtNameId),
        courtLocationId: parseInt(invite.courtLocationId),
        comment: invite.comment,
        datePosted: date.toLocacalDateString()

        }
    
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newInvite)
        }
 
        return fetch("http://localhost:8088/invites", fetchOption)
        .then(() => {
            history.push("/invites")
        })
 
    }
 

    useEffect( () => {
        return fetch(`http://localhost:8088/invites?_expand=inviteId=$(invite.id)`)
        .then((res)=>res.json())
        .then( (data) => {setInvites (data)})
    },
    [])


        
    return (
        <>
        {
        invite.map((i)=> {
            return <li className="invites_id" key={i.id}>
            <p>
                Invite #{i.id} is from {i.playerId.name}--captain. Match is on {i.matchDayId.name}, {i.matchDate.timestamp}, at {i.matchTime.timestamp}. We play {i.homeStatusId.name} at 
                {i.courtName.name} at {i.courtLocationId.address}. See comment: {i.comment}.

            </p>
            {i.playerId===currentUserId ? <button className="btn--inviteDelete" onClick={() => deleteInvite(i.id) }>delete</button> : ""}
        </li>
            
        }) 
        
}
        <button
            onClick={ submitPost}
            className="btn btn-primary"> Post Invite </button>
        </>
    )
}