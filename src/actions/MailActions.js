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

export function hideActions(id) {
  dispatch({
    type: 'HIDE_ACTIONS',
    id,
  });
}

export function toggleDetails(id) {
  dispatch({
    type: 'TOGGLE_DETAILS',
    id,
  });
}

export function loadMail() {
  dispatch({ type: 'FETCH_MAIL' });
  API.get('mail').then((mail) => {
    const { emails } = mail.data;
    dispatch({
      type: 'RECEIVE_MAIL',
      data: emails.reverse(), // sort by date descending for now
    })
  }).catch((err) => {
    dispatch({
      type: 'FETCH_MAIL_ERROR',
      err,
    })
  });
}

export function getNewMail() {
  API.get('newMail').then((newMail) => {
    const { newMessages } = newMail;
    if (newMessages > 0) {
      loadMail();
    }
  }).catch((err) => {
    dispatch({
      type: 'FETCH_NEW_MAIL_ERROR',
      err,
    });
  });
}

export function showReply(id) {
  dispatch({
    type: 'SHOW_REPLY',
    id
  })
}