import dispatcher from '../dispatcher';

import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:3000/secure-api/',
  headers: {
    /* PRIORITY: LOW
    ** this method is NOT safe for deployment, change backend
    ** to use sessions to avoid this secuirty issue.
    */
    'token': require('../../TEMP-TOKEN-FILE.js');
  }
});

export function createMail(text) {
  dispatcher.dispatch({
    type: 'CREATE_MAIL',
    text,
  });
}

export function loadMail() {
  dispatcher.dispatch({ type: 'FETCH_MAIL' });
  API.get('mail').then((mail) => {
    const { emails } = mail.data;
    dispatcher.dispatch({
      type: 'RECEIVE_MAIL',
      data: emails,
    })
  })
}