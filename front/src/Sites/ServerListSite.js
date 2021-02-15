import React from 'react';
import ServerList from '../Components/ServerList';
import Statistics from "../Components/Statistics";

const ServerListSite = () => {
  return (
    <>
      <Statistics/>

      <ServerList endpoint={"/api/v1/servers"} link={'/server/{id}/info'}/>
    </>
  )
}

export default ServerListSite;
