import React, { Component } from 'react';
import * as MailActions from '../actions/MailActions';
import './styles/Message.css';

export default class Message extends Component {
  showDetails(event) {
    MailActions.displayDetails(event.target.id);
  }
  
  render() {
    const { message } = this.props;
    const id = message._id;
    const displaying = (this.props.displaying === id);
    const display = displaying ? { display: 'block' } : { display: 'none' };
    return (
      <div
        className="email"
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
          {message.text}
        </div>
      </div>
    );
  }
}