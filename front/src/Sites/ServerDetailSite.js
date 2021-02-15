import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
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
  const [serverStatistics1h, setServerStatistics1h] = useState({});
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
      getStatistics(params.id, 1000*60*5, 12).then((response) => {
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
      setServerStatistics1h(values[0]);
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

              {/*<a className="nav-link" href="#">Link</a>*/}
              {/*<a className="nav-link" href="#">Link</a>*/}
              {/*<a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>*/}
            </nav>
          </div>
          <div className="row">
            <div className="col-12 p-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/servers" onClick={(event => {event.preventDefault(); history.push(event.target.attributes.href.nodeValue)})}>Server List</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Server</li>
                </ol>
              </nav>
            </div>
          </div>
          <br/>
          <br/>
          <>
            {/*<Route*/}
            {/*  exact path="/server/:id/info"*/}
            {/*  component={InfoCard}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  exact path="/server/:id"*/}
            {/*  component={InfoCard}*/}
            {/*/>*/}

            {/*<Route*/}
            {/*  exact path="/server/:id/players"*/}
            {/*  component={PlayersCard}*/}
            {/*/>*/}

            {isDataFetched && <InfoCard data={serverDetails.data} className={!matchPath(pathname, "/server/:id/info") ? 'd-none' : ''}/>}
            {isDataFetched && <PlayersCard className={!matchPath(pathname, "/server/:id/players") ? 'd-none' : ''}/>}
            {isStatisticsDataFetched && <StatisticsCard hourStat={serverStatistics1h.data} dayStat={serverStatistics24h.data} yearStat={serverStatisticsYear.data} className={!matchPath(pathname, "/server/:id/statistics") ? 'd-none' : ''}/>}
          </>

        </>
      </Router>
    </Switch>
  )
}

export default ServerDetailSite;
