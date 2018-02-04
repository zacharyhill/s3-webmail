import { dispatch } from '../dispatcher';

import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:3000/secure-api/',
  headers: {
    /* PRIORITY: LOW
    ** this method is NOT safe for deployment, change backend
    ** to use sessions to avoid this secuirty issue.
    */
    'token': require('../TEMP-TOKEN-FILE.js')
  }
});

export function createMail(text) {
  dispatch({
    type: 'CREATE_MAIL',
    text,
  });
}

export function loadMail() {
  dispatch({ type: 'FETCH_MAIL' });
  API.get('mail').then((mail) => {
    const { emails } = mail.data;
    dispatch({
      type: 'RECEIVE_MAIL',
      data: emails,
    })
  }).catch((err) => {
    dispatch({
      type: 'FETCH_MAIL_ERROR',
      err,
    })
  });
}