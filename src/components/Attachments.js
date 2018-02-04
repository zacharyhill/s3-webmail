import React from 'react';

export default (props) => {
  const { attachments } = props;
  const ShowAttachments = attachments.map((attachment) => {
      return (
        <span key={attachment}>{attachment}</span>
      )
  });
  if (attachments.length) {
    return (
      <div className="attachments">
        <span className="title">Attachments ({attachments.length}):</span>
        {ShowAttachments}
      </div>
    );
  } else {
    return null;
  }
}