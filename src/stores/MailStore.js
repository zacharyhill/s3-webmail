import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class MailStore extends EventEmitter {

  constructor() {
    super();
    this.mail = [];
  }

  // this is a dummy function that shows us how to do this for later
  createMail(text) {
    const id = Date.now();
    this.mail.push({
      id,
      subject: text,
    });
    this.emit("change");
  }

  getAll() {
    return this.mail;
  }

  getNew() {
    // use axios method when we get to async redux in videos
  }

  receiveMail(mail) {
    this.mail = mail;
    this.emit('change');
  }

  handleActions(action) {
    console.log('MailStore received an action', action); // for testing
    switch(action.type) {
      case 'CREATE_MAIL': {  // also just for testing
        this.createMail(action.text);
        break;
      }
      case 'RECEIVE_MAIL': {
        this.receiveMail(action.data);
        break;
      }
      default: {}
    }
  }

}

const mailStore = new MailStore();
dispatcher.register(mailStore.handleActions.bind(mailStore));

//for testing
window.dispatcher = dispatcher;

export default mailStore;