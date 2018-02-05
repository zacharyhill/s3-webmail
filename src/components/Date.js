import React from 'react';

export default (props) => {
  const date = new Date(props.date);
  const formattedDate = date.toLocaleDateString();
  return (
    <div className="date">
      {formattedDate}
    </div>
  );
}