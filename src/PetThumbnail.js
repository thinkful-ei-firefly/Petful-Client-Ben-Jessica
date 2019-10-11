import React from 'react';

function PetThumbnail (props) {

return (
  <li>
    <img
      src={props.imageURL}
      alt={props.imageDescription}
    />
    <span>{props.name}</span>
  </li>
);
}

export default PetThumbnail