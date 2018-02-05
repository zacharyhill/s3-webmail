import React from 'react';

export default (props) => {
  const { text } = props.from;
  const startOfEmail = text.indexOf('<');
  let emailAddress;
  let name;
  if (startOfEmail !== 0) {
    emailAddress = text.substr(startOfEmail);
    name = text.substr(0, startOfEmail);
  } else {
    emailAddress = text;
  }
  const from = name || emailAddress;
  return (
    <div className="from" data-email-addr={emailAddress}>
      {from}
    </div>
  );
}