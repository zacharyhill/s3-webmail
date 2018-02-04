import React, { Component } from 'react';

import * as MailActions from '../actions/MailActions';
import MailStore from '../stores/MailStore';

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

  showDetails(e) {
    MailActions.displayDetails(e.target.id);
  }

  render() {
    const { mail } = this.state;

    const MailList = mail.map((message) => {
      const id = message._id;
      const displaying = (this.state.displaying === id);
      const display = displaying ? { display: 'block' } : { display: 'none' };
      return (
        <li
          className="email"
          key={id}
        >
          <div
            className="subject"
            id={id}
            onClick={this.showDetails.bind(this)}
          >
            {message.subject}
          </div>
          <div
            className="details"
            style={display}  
          >
            <ul>
              <li>{message.text}</li>
            </ul>
          </div>
        </li>
      );
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
