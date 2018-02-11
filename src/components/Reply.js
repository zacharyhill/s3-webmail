import React, { Component } from 'react';

import * as MailActions from '../actions/MailActions';

export default class Reply extends Component {
  constructor() {
    super();
    this.state = {
      messageText: '',
    };
  }
  handleChange(event) {
    this.setState({ messageText: event.target.value });
  }
  replyToMail() {
    const { msg } = this.props;
    const mailObj = {
      to: msg.from.text,
      cc: '',
      bcc: '',
      subject: `RE: ${msg.subject}`,
      text: this.state.messageText,
    }
    this.setState({ messageText: '' });
    MailActions.sendMail(mailObj);
  }
  render() {
    const replying = (this.props.replying === this.props.id);
    const styles = {};
    styles.expandReply = replying ? { display: 'block' } : { display: 'none' };

    const msgText = this.state.messageText;
    return (
      <div style={styles.expandReply}>
        <textarea onChange={this.handleChange.bind(this)} value={msgText}></textarea>
        <button onClick={this.replyToMail.bind(this)}>Send</button>
      </div>
    );
  }
}