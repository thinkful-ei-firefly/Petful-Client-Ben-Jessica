import React from 'react';

class AdoptionPet extends React.Component {
  static defaultProps = {}
  
  render() {
    const {
      imageURL,
      imageDescription,
      name,
      sex,
      age,
      breed,
      story
    } = this.props.currentPet;
    return (
      <div className="AdoptionPet">
        <img src={imageURL} alt={imageDescription} />
        <h2 className="PetHeader">Name: {name}</h2>
        <p>Sex: {sex}</p>
        <p>Age: {age}</p>
        <p>Breed: {breed}</p>
        <p>Story: {story}</p>
      </div>
    );
  }  
}

export default AdoptionPet;
