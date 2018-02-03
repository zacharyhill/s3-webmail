import dispatcher from '../dispatcher';

export function createMail(text) {
  dispatcher.dispatch({
    type: 'CREATE_MAIL',
    text,
  });
}