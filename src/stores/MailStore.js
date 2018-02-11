import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class MailStore extends EventEmitter {

  constructor() {
    super();
    this.mail = [];
    this.fetching = false;
    this.fetched = false;
    this.err = null;
    this.displaying = null;
    this.replying = null;
    this.hidingActions = null;
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

  toggleDetails(id) {
    this.displaying = this.displaying === id ? null : id;
    this.emit('change');
  }

  fetchMailError(err) {
    this.err = err;
    this.emit('change');
  }

  getState() {
    return {
      mail: this.mail,
      fetching: this.fetching,
      fetched: this.fetched,
      err: this.err,
      displaying: this.displaying,
      replying: this.replying,
      hideActions: this.hidingActions,
    }
  }

  hideActions(id) {
    this.hidingActions = id;
    this.emit('change');
  }

  receiveMail(mail) {
    this.mail = mail;
    this.emit('change');
  }

  showReply(id) {
    this.replying = id;
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
      case 'FETCH_MAIL_ERROR': {
        this.fetchMailError(action.err);
        break;
      }
      case 'HIDE_ACTIONS': {
        this.hideActions(action.id);
        break;
      }
      case 'SHOW_REPLY': {
        this.showReply(action.id);
        break;
      }
      case 'TOGGLE_DETAILS': {
        this.toggleDetails(action.id);
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