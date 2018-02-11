import React, { Component } from 'react';
import * as MailActions from '../actions/MailActions';
import Attachments from './Attachments';
import Date  from './Date';
import From from './From';
import Reply from './Reply';
import ReplyTo from './ReplyTo';
import './styles/Message.css';

export default class Message extends Component {
  showDetails(event) {
    MailActions.toggleDetails(event.target.id);
  }
  
  render() {
    const { message } = this.props;
    const id = message._id;
    const displaying = (this.props.displaying === id);
    const hideActions = (this.props.hideActions === id);
    const styles = {};
    styles.expandMessage = displaying ? { borderLeft: '2px solid gray' } : {};
    styles.expandDetails = displaying ? { display: 'block' } : { display: 'none' };
    styles.displayActions = hideActions ? { display: 'none' } : { display: 'block' };
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
          <From from={message.from} className="from" id={id} />
        </div>
        <div
          className="details"
          style={styles.expandDetails}  
        >
          <Date date={message.date} />
          <div>
            <p>
              {message.text}
            </p>
          </div>
          <Attachments attachments={message.attachments} />
          <div className="bottomBar" style={styles.displayActions}>
            <ReplyTo
              id={id}
            />
          </div>
          <Reply
            replying={this.props.replying}
            id={id}
            from={message.from}
            msg={message}
          />
        </div>
      </div>
    );
  }
}