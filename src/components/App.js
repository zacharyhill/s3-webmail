import React, { Component } from 'react';

import MailStore from '../stores/MailStore';

import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mail: MailStore.getAll(),
    }
    window.state = this.state;
  }

  componentWillMount() {
    MailStore.on("change", () => {
      this.setState({
        mail: MailStore.getAll(),
      })
    });
  }

  render() {
    const { mail } = this.state;

    const MailList = mail.map((message) => {
      return <li key={message.id}>{message.text}</li>
    });

    return (
      <div>
        <h1>Mail</h1>
        <ul>{MailList}</ul>
      </div>
    );
  }
}

// for testing
window.MailStore = MailStore;

export default App;
