import React from 'react';
import AdoptionPet from './AdoptionPet';
import PetThumbnail from './PetThumbnail';
import './AdoptionPage.css';

class AdoptionPage extends React.Component {
  state = { loading: true };
  static defaultProps = {}

  componentDidMount() {
    this.props.update().then(res => this.setState({ loading: false }));
    this.timerId = setInterval(() => {
      this.props.update()
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  handleAdoptClick = () => {
    this.props.adoptPet();
    this.props.update();
  }
 
  render() {
    if (this.state.loading) {
      return <h1>Loading.....</h1>
    }
    if (this.props.pets.length === 0) {
      return <h2>There are no pets of this type currently available for adoption.</h2>
    }
    const waitingPets = this.props.pets.slice(1);
    const currentPet = this.props.pets[0];
    const queue = this.props.queue;
    const user = this.props.user;

    const petList = waitingPets.map((petData, index) => (
      <PetThumbnail
        key={index}
        name={petData.name}
        imageURL={petData.imageURL}
        imageDescription={petData.imageDescription}
      />
    ));

    const queuePeople = queue.map((personData, index) => (
      <li key={index}>{personData.name}</li>
    ));
    const position = queue.findIndex(person => person.id === user.id);

    let queuePrompt = '';
    if (position === 0) queuePrompt = "It's your turn to adopt a pet!";
    if (position < 0)
      queuePrompt =
        'You are not currently in line. Please return to the home page and submit the adoption form.';
    if (position === 1) queuePrompt = 'There is 1 person before you in line.';
    if (position > 1)
      queuePrompt = `There are ${position} people before you in line.`;

    return (
      <div>
        <h1 className="AdoptH1">Adopt a Pet!</h1>
        <div className="CurrentPet">
          <AdoptionPet currentPet={currentPet} />
          <button 
            // disabled={position !== 0}
            onClick={this.handleAdoptClick}
          >
            Adopt Now!
          </button>
        </div>

        <h2>Other Pets Awaiting Adoption</h2>
        <ul>{petList}</ul>
        <h2>Adoption Queue</h2>
        <p className="queue-prompt">{queuePrompt}</p>
        <ul className="queue-people">{queuePeople}</ul>
      </div>
    );
  }
}

export default AdoptionPage;
