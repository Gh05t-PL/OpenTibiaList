import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, Switch, useHistory} from "react-router-dom";
import {useLocation, useParams, matchPath} from "react-router";
import InfoCard from "./ServerDetail/InfoCard";
import PlayersCard from "./ServerDetail/PlayersCard";
import StatisticsCard from "./ServerDetail/StatisticsCard";
import {getDetail, getStatistics} from "../Services/Servers";

const ServerDetailSite = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const [pathname, setPathname] = useState(location.pathname);
  const [serverDetails, setServerDetails] = useState({});
  const [serverStatistics2h, setServerStatistics2h] = useState({});
  const [serverStatistics24h, setServerStatistics24h] = useState({});
  const [serverStatisticsYear, setServerStatisticsYear] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isStatisticsDataFetched, setIsStatisticsDataFetched] = useState(false);

  useEffect(() => {
    getDetail(params.id, (data) => {
      console.log(data)
      setServerDetails(data)
      setIsDataFetched(true)
    })
  }, [])

  useEffect(() => {
    let p1 = new Promise((resolve, reject) => {
      getStatistics(params.id, 1000*60*5, 24).then((response) => {
        response.json().then((json) => {
          return resolve(json);
        });
      })
    })
    let p2 = new Promise((resolve, reject) => {
      getStatistics(params.id, 1000*60*60, 24).then((response) => {
        response.json().then((json) => {
          return resolve(json);
        });
      })
    })
    let p3 = new Promise((resolve, reject) => {
      getStatistics(params.id, 1000*60*60*24, 366).then((response) => {
        response.json().then((json) => {
          return resolve(json);
        });
      })
    })

    Promise.all([
      p1,
      p2,
      p3
    ]).then(values => {
      setServerStatistics2h(values[0]);
      setServerStatistics24h(values[1]);
      setServerStatisticsYear(values[2]);

      setIsStatisticsDataFetched(true);
    })
  }, [])


  return (
    <Switch>
      <Router>
        <>
          <div className="row">
            <nav className="nav nav-tabs">
              <Link
                className={`nav-item nav-link ${pathname !== `/server/${params.id}/info` ? "" : "active"}`}
                to={`/server/${params.id}/info`}
                onClick={() => {
                  setPathname(`/server/${params.id}/info`)
                }}
              >
                Info
              </Link>
              <Link
                className={`nav-item nav-link ${pathname !== `/server/${params.id}/players` ? "" : "active"}`}
                to={`/server/${params.id}/players`}
                onClick={() => {
                  setPathname(`/server/${params.id}/players`)
                }}
              >
                Players
              </Link>
              <Link
                className={`nav-item nav-link ${pathname !== `/server/${params.id}/statistics` ? "" : "active"}`}
                to={`/server/${params.id}/statistics`}
                onClick={() => {
                  setPathname(`/server/${params.id}/statistics`)
                }}
              >
                Statistics
              </Link>
            </nav>
          </div>
          <div className="row">
            <div className="col-12 p-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/servers" onClick={(event => {event.preventDefault(); history.push(event.target.attributes.href.nodeValue)})}>Server List</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Server: {serverDetails?.data?.name} |{serverDetails?.data?.online ? (<span className={'text-success font-weight-bold'}>ONLINE</span>) : (<span className={'text-danger font-weight-bold'}>OFFLINE</span>)}</li>
                </ol>
              </nav>
            </div>
          </div>
          <br/>
          <br/>
          <>
            {isDataFetched && <InfoCard data={serverDetails.data} className={!matchPath(pathname, "/server/:id/info") ? 'd-none' : ''}/>}
            {isDataFetched && <PlayersCard serverDetails={serverDetails.data} className={!matchPath(pathname, "/server/:id/players") ? 'd-none' : ''}/>}
            {isStatisticsDataFetched && <StatisticsCard hourStat={serverStatistics2h.data} dayStat={serverStatistics24h.data} yearStat={serverStatisticsYear.data} className={!matchPath(pathname, "/server/:id/statistics") ? 'd-none' : ''}/>}
          </>

        </>
      </Router>
    </Switch>
  )
}

export default ServerDetailSite;
