import React from 'react';

import * as MailActions from '../actions/MailActions';

export default (props) => {
  const replying = (props.replying === props.id);
  const styles = {};
  styles.expandReply = replying ? { display: 'block' } : { display: 'none' };

  return (
    <div style={styles.expandReply}>
      <textarea></textarea>
      <button>Send</button>
    </div>
  );
}