import React, {useEffect} from "react";
import ServerInfoRow from "../../Components/ServerInfoRow";
import {useParams} from "react-router";
import {pvpMapper} from "../../Enum/PvPTypes";
import moment from 'moment'


const InfoCard = ({data, ...props}) => {
  console.log(data)

  return (
    <div className={props.className}>
      <div className="row">
        <div className="col-7 p-0 pr-5">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-3">Basic Information:</h3>
              <table className="table table-striped">
                <tbody>
                  <ServerInfoRow
                    label={"Name"}
                    value={data.name}
                  />
                  <ServerInfoRow
                    label={"Status"}
                    value={data.online ? (<span className={'text-success font-weight-bold'}>ONLINE</span>) : (<span className={'text-danger font-weight-bold'}>OFFLINE</span>)}
                  />
                  <ServerInfoRow
                    label={"IP"}
                    value={data.ip}
                  />
                  <ServerInfoRow
                    label={"Port"}
                    value={data.port}
                  />
                  <ServerInfoRow
                    label={"Client"}
                    value={data.protocolVersion}
                  />
                  <ServerInfoRow
                    label={"Players"}
                    value={`${data.players.online} / ${data.players.max}`}
                  />

                  <ServerInfoRow
                    label={"Uptime"}
                    value={`${data.uptime}%`}
                  />
                  <ServerInfoRow
                    label={"PvP Type"}
                    value={pvpMapper[data.pvpType]}
                  />
                  <ServerInfoRow
                    label={"Exp Rate"}
                    value={"x123 H"}
                  />
                  <ServerInfoRow
                    label={"Exp Stages?"}
                    value={"Yes H"}
                  />
                  <ServerInfoRow
                    label={"Map"}
                    value={"Custom H"}
                  />

                  <ServerInfoRow
                    label={"Server Added"}
                    value={moment(data.createdAt).format("DD.MM.YYYY HH:mm:ss")}
                  />
                  <ServerInfoRow
                    label={"Info Updated"}
                    value={"27.12.2021 14:16:54 H"}
                  />
                  <ServerInfoRow
                    label={"Statistics Updated"}
                    value={"27.12.2021 14:16:54 H"}
                  />
                </tbody>
              </table>
              {/*<table className="table table-striped">*/}
              {/*  <tbody>*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Uptime"}*/}
              {/*      value={"18.93%"}*/}
              {/*    />*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"PvP Type"}*/}
              {/*      value={"PvPe"}*/}
              {/*    />*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Exp Rate"}*/}
              {/*      value={"x123"}*/}
              {/*    />*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Exp Stages?"}*/}
              {/*      value={"Yes"}*/}
              {/*    />*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Map"}*/}
              {/*      value={"Custom"}*/}
              {/*    />*/}
              {/*  </tbody>*/}
              {/*</table>*/}
              {/*<table className="table table-striped">*/}
              {/*  <tbody>*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Added"}*/}
              {/*      value={"20.12.2020 18:30"}*/}
              {/*    />*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Info Updated"}*/}
              {/*      value={"20.12.2020 18:30"}*/}
              {/*    />*/}
              {/*    <ServerInfoRow*/}
              {/*      label={"Statistics Updated"}*/}
              {/*      value={"20.12.2020 18:30"}*/}
              {/*    />*/}
              {/*  </tbody>*/}
              {/*</table>*/}
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

export default InfoCard;
