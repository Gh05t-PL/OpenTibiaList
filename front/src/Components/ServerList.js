import React, {useEffect, useState} from "react";
import Pagination from './Pagination'
import {useHistory} from "react-router";
import {getServerList} from "../Services/Servers";


const ServerList = ({link}) => {
  const [rowsCount, setRowsCount] = useState(10);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [servers, setServers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);

    getServerList(page, rowsCount, function (data) {
      console.log(data);
      setServers(data.data.rows)
      setPageCount(Math.ceil(data.data.size / rowsCount))
      setIsLoading(false);
    })

  }, [rowsCount, page])

  useEffect(() => {
    setPage(1)
  }, [rowsCount])

  return (
    <>
      <div className="container-fluid" style={{padding: "0"}}>
        <div className="row justify-content-between">
          <div className="col-6">
            <Pagination page={page} buttonsCount={5} pages={pageCount} setPage={setPage}/>

          </div>
          <div className="col-2 d-flex justify-content-end">
            <div style={{width: "150px"}}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Rows: </label>
                </div>
                <select className="custom-select" name="rows" id="" onChange={event => {
                  setRowsCount(Number(event.target.value));
                }} value={rowsCount}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>


          </div>
        </div>
      </div>
      {
        isLoading && (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{
                width: "3.5rem",
                height: "3.5rem"
              }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) || (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Server Name</th>
                  <th>IP [Port]</th>
                  <th>Players / Max</th>
                  <th>Players Record</th>
                  <th>Uptime</th>
                  <th>PVP Type</th>
                  <th>Client Version</th>
                </tr>
              </thead>
              <tbody>
                {
                  servers.map((server) => {
                    return (
                      <tr
                        onClick={() => {
                          history.push(link.replace('{id}', server.id))
                        }}
                        key={server.id}
                        className={'cursor-pointer'}
                      >
                        <td>{server.ordinal}</td>
                        <td><span className={server.online ? 'text-success' : 'text-danger'}>{server.name}</span></td>
                        <td>{server.ip} [{server.port}]</td>
                        <td>{server.online ? (server.players.max === 0 ?
                          <span>{server.players.online} / <i className="fas fa-infinity"></i></span> :
                          <span>{server.players.online} / <span
                            className="font-weight-bold">{server.players.max}</span></span>) : (
                          <span className='text-danger font-weight-bold'>OFFLINE</span>)}</td>
                        <td>{server.players.peak}</td>
                        <td>{server.uptime}%</td>
                        <td>{server.pvpType}</td>
                        <td>{server.protocolVersion}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>



          </div>
        )
      }

      <div className="container-fluid" style={{padding: "0"}}>
        <div className="row justify-content-between">
          <div className="col-6">
            <Pagination page={page} buttonsCount={5} pages={pageCount} setPage={setPage}/>
          </div>
          <div className="col-2 d-flex justify-content-end">
            <div style={{width: "150px"}}>
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Rows: </label>
                </div>
                <select className="custom-select" name="rows" id="" onChange={event => {
                  setRowsCount(Number(event.target.value));
                }} value={rowsCount}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default ServerList;
