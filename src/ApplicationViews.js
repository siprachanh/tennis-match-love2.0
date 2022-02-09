import React from "react";
import { Route } from "react-router-dom";
import { InviteList } from "./components/invites/InviteList";
import { InviteCard } from "./components/invites/InviteCard";
import { PlayerList } from "./components/players/PlayerList";
import { CaptainList } from "./components/captain/CaptainList";
import { InviteCardEdit } from "./components/invites/InviteCardEdit";
import { CreateInvite } from "./components/invites/CreateInvite";


export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/invites">
       < InviteList/>
      </Route>
      <Route path="/invites/create">
        <CreateInvite/>
      </Route>
      <Route exact path="/captains">
        <CaptainList/>
        
      </Route> 
      <Route path="/invites/edit/:inviteId(\d+)">
        <InviteCardEdit />
      </Route>
      <Route exact path="/players">
        <PlayerList/>
        
      </Route> 
  
    </>
  );
};
