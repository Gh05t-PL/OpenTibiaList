import React from "react";

import PlayerInfoRow from "../../Components/PlayerInfoRow";

const PlayersCard = ({serverDetails, ...props}) => {

  return (
    <div className={props.className}>
      <div className="row">
        <div className="col-7 p-0 pr-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-1">Players Online:</h3>
              <h5 className="mb-1">{serverDetails.players.online} / {serverDetails.players.max}</h5>
              <h6 className="mb-4">Updated: 20.12.2202 16:35</h6>
              <table className="table table-striped">
                <tbody>
                  <PlayerInfoRow
                    playerName={"Marco"}
                    level={123}
                  />
                  <PlayerInfoRow
                    playerName={"Vivaldi"}
                    level={123}
                  />
                  <PlayerInfoRow
                    playerName={"Angelo"}
                    level={123}
                  />
                  <PlayerInfoRow
                    playerName={"Rorschach"}
                    level={123}
                  />
                  <PlayerInfoRow
                    playerName={"Eisenhower"}
                    level={123}
                  />
                  <PlayerInfoRow
                    playerName={"Keanu West"}
                    level={123}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-5 p-0">
          <div className="card">
            <div className="card-body">
              <img src="https://otservlist.org/html/images/banners/d9c306f68886258c6425d4fe.png" alt="" width="100%"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayersCard;
