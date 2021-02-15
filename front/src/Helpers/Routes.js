export const LOGIN_ENDPOINT = '/api/v1/security/login';
export const LOGOUT_ENDPOINT = '/api/v1/security/logout';
export const IS_LOGGED_IN_ENDPOINT = '/api/v1/security/isLoggedIn';
export const REGISTER_ENDPOINT = '';
export const ACTIVE_ACCOUNT_ENDPOINT = '';


export const SERVER_EDIT_ENDPOINT = (id) => ``;
export const SERVER_ADD_ENDPOINT = '';
export const MY_SERVER_LIST_ENDPOINT = '';

export const SERVER_LIST_ENDPOINT = '/api/v1/servers';
export const SERVER_DETAIL_ENDPOINT = (id) => `/api/v1/servers/${id}`;
export const SERVER_STATISTICS_ENDPOINT = (id) => `/api/v1/servers/${id}/statistics`;

export const getRoute = (route) => window.API_HOST + route
