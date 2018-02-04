import React, { Component } from 'react';

import * as MailActions from '../actions/MailActions';
import MailStore from '../stores/MailStore';

import Message from './Message';
import './styles/App.css';

export default class App extends Component {
  constructor() {
    super();
    MailActions.loadMail();
    this.state = MailStore.getState();
    window.MailStore = MailStore;
  }

  createMail() { // also a dummy function to show us how it's done
    MailActions.createMail(Date.now());
  }

  componentWillMount() {
    MailStore.on("change", () => {
      this.setState(MailStore.getState());
    });
  }

  loadMail() {
    MailActions.loadMail();
  }

  render() {
    const { mail } = this.state;

    const MailList = mail.map((msg) => {
      return <Message key={msg._id} message={msg} displaying={this.state.displaying} />;
    });

    return (
      <div>
        <button onClick={this.createMail.bind(this)}>Create</button>
        <h1>Mail</h1>
        <ul>{MailList}</ul>
        <button onClick={this.loadMail.bind(this)}>Load</button>
      </div>
    );
  }
}
