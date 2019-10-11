import React from 'react';
import AdoptionPet from './AdoptionPet';
import PetThumbnail from './PetThumbnail';

class AdoptionPage extends React.Component {
  state = {loading: true}
  componentDidMount() {
    this.props.update()
      .then(res => this.setState({loading: false}))
  }
  
  render () {
    if (this.state.loading) {
      return <h1>Loading.....</h1>
    }

    const waitingPets = this.props.pets.slice(1);
    const currentPet = this.props.pets[0];
    const queue = this.props.queue;
    const user = this.props.user;

    const petList = waitingPets.map(petData => <PetThumbnail 
      key={petData.imageURL}
      name={petData.name} 
      imageURL={petData.imageURL}
      imageDescription={petData.imageDescription}
    />)

    const queuePeople = queue.map(personData => <li key={personData.id}>{personData.name}</li>)
    const position = queue.findIndex(person => person.id === user.id);

    let queuePrompt ='';
    if (position === 0) queuePrompt = 'It\'s your turn to adopt a pet!';
    if (position < 0) queuePrompt = 'You are not currently in line. Please return to the home page and submit the adoption form.'
    if (position === 1) queuePrompt = 'There is 1 person before you in line.'
    if (position > 1) queuePrompt = `There are ${position} people before you in line.`

    return (
      <div>
        <h1>Adopt a Pet!</h1>
        <AdoptionPet currentPet={currentPet} />
        <button type="button" disabled={position !==0}>Adopt Now!</button>
        <h2>Other Pets Awaiting Adoption</h2>
        <ul>
          {petList}
        </ul>
        <h2>Adoption Queue</h2>
        <p>{queuePrompt}</p>
        <ul>
          {queuePeople}
        </ul>
      </div>
    )
  }
}

export default AdoptionPage