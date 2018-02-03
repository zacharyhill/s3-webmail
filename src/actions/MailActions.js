import dispatcher from '../dispatcher';

import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:3000/secure-api/',
  headers: {
    // let's pull this from a constants file
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYm9iIiwicGFzc3dvcmQiOiJyYXdyIn0sImlhdCI6MTUxNzYyODczOSwiZXhwIjoxNTE3NjMyMzM5fQ.JJ3cZSnBTFnjYAGhx_05cg9hXXp2DEuEp3zuNBdLSwA'
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