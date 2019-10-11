import React from 'react';

function AdoptionPet (props) {
  const { imageURL, imageDescription, name, sex, age, breed, story } = props.currentPet;
  return (
    <div>
      <img 
        src={imageURL}
        alt={imageDescription}
      />
      <h2>Name: {name}</h2>
      <p>Sex: {sex}</p>
      <p>Age: {age}</p>
      <p>Breed: {breed}</p>
      <p>Story: {story}</p>
    </div>
  );
}

export default AdoptionPet;