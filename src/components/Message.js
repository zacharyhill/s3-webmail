import React, { Component } from 'react';
import * as MailActions from '../actions/MailActions';
import Attachments from './Attachments';
import From from './From';
import './styles/Message.css';

export default class Message extends Component {
  showDetails(event) {
    MailActions.toggleDetails(event.target.id);
  }
  
  render() {
    const { message } = this.props;
    const id = message._id;
    const displaying = (this.props.displaying === id);
    const styles = {};
    styles.expandMessage = displaying ? { borderLeft: '2px solid gray' } : {};
    styles.expandDetails = displaying ? { display: 'block' } : { display: 'none' };
    return (
      <div
        className="email"
        style={styles.expandMessage}
      >
        <div
          className="subject"
          id={id}
          onClick={this.showDetails.bind(this)}
        >
          {message.subject}
          <From from={message.from} className="from" onClick={this.showDetails.bind(this)} />
        </div>
        <div
          className="details"
          style={styles.expandDetails}  
        >
          <div>
            {message.text}
          </div>
          <Attachments attachments={message.attachments} />
        </div>
      </div>
    );
  }
}