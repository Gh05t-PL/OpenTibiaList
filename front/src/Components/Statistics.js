import React, {useEffect, useState} from 'react';

const Statistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/stats/serverDetailed', {credentials: 'include'})
      .then((response) => {
        response.json().then((json) => {
          if (json) {
            setStats(json.data);
          }
        })
      })
  }, [])

  return (
    <>
      <div className="card-deck" style={{marginBottom: "15px"}}>
        <div className="col-sm-4">
          <div className="card text-center">
            <div className="card-header">
              Statistics
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">Servers on list: <span
                className="font-weight-bold">{stats?.allCount}</span></li>
              <li className="list-group-item">Servers online: <span
                className="font-weight-bold">{stats?.onlineCount}</span></li>
              <li className="list-group-item">Average Uptime: <span
                className="font-weight-bold">{(stats?.avgUptime ?? '') + '%'}</span></li>
              <li className="list-group-item">Overall players online: <span
                className="font-weight-bold">{stats?.playersOnline}</span></li>
              <li className="list-group-item">Last Update: <span
                className="font-weight-bold">{stats?.collectionDate}</span></li>
            </ul>

          </div>
        </div>
        <div className="col-sm-4">
          <div className="card text-center">
            <div className="card-header">Advertising</div>
            <div className="card-body">
              <img src="https://otservlist.org/html/images/banners/a8831b6c0e25016b23522b85.gif" alt=""/>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card text-center">
            <div className="card-header">
              Top 5 Servers
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">1. FireFun <span className="font-weight-bold">(451)</span></li>
              <li className="list-group-item">2. Almera <span className="font-weight-bold">(279)</span></li>
              <li className="list-group-item">3. Vivantis <span className="font-weight-bold">(214)</span></li>
              <li className="list-group-item">4. Roxor <span className="font-weight-bold">(174)</span></li>
              <li className="list-group-item">5. Herok <span className="font-weight-bold">(102)</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row justify-content-center" style={{marginBottom: "15px"}}>
        <img src="https://otservlist.org/html/images/banners/d9c306f68886258c6425d4fe.png" alt=""/>
      </div>
    </>
  )
}

export default Statistics;
