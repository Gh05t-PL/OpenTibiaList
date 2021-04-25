import {getRoute, SERVER_DETAIL_ENDPOINT, SERVER_LIST_ENDPOINT, SERVER_STATISTICS_ENDPOINT} from "../Helpers/Routes";
import * as queryString from "querystring";


export const getDetail = (id, cb) => {
  fetch(
    getRoute(SERVER_DETAIL_ENDPOINT(id)),
    {credentials: "include"}
  )
    .then((response) => {
      response.json().then(cb);
    })
}

export const getStatistics = (id, interval, limit) => {
  return fetch(
    getRoute(SERVER_STATISTICS_ENDPOINT(id)) + '?' + queryString.stringify({
      interval: interval,
      limit: limit,
    }),
    {credentials: "include"}
  )
}

export const getServerList = (page, rowsCount, cb) => {
  fetch(getRoute(SERVER_LIST_ENDPOINT) + '?' + new URLSearchParams({
    limit: rowsCount,
    offset: (page - 1) * rowsCount,
  }), {credentials: "include"})
    .then((response) => {
      response.json().then(cb);
    })
}
