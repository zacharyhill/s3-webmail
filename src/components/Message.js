import React, { Component } from 'react';
import * as MailActions from '../actions/MailActions';
import Attachments from './Attachments';
import './styles/Message.css';

export default class Message extends Component {
  showDetails(event) {
    MailActions.toggleDetails(event.target.id);
  }
  
  render() {
    const { message } = this.props;
    const id = message._id;
    const displaying = (this.props.displaying === id);
    const displayMessage = displaying ? { borderLeft: '3px solid gray' } : {};
    const displayDetails = displaying ? { display: 'block' } : { display: 'none' };
    return (
      <div
        className="email"
        style={displayMessage}
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
          style={displayDetails}  
        >
          <div>
            <span className="title">From:</span>
            {message.from.text}
          </div>
          <div>
            {message.text}
          </div>
          <Attachments attachments={message.attachments} />
        </div>
      </div>
    );
  }
}