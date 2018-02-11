import React from 'react';

import * as MailActions from '../actions/MailActions';

export default (props) => {
  // const replyToEmail = function() {
  //   const emailAddress = props.from.value[0].address;
  // }

  const showReply = function(event) {
    MailActions.showReply(event.target.id);
    MailActions.hideActions(event.target.id);
  }

  return (
    <button
      id={props.id}
      onClick={showReply}
    >
      Reply
    </button>
  );
}