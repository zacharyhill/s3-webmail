import { EventEmitter } from 'events';

import axios from 'axios';

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
      text
    });
    this.emit("change");
  }

  getAll() {
    return this.mail;
  }

  getNew() {
    // use axios method when we get to async redux in videos
  }

}

const mailStore = new MailStore();

export default mailStore;