import React from 'react';
import './App.css';
import { Route, Router } from 'react-router-dom';
import HomePage from './HomePage';
import AdoptionPage from './AdoptionPage';
import cuid from 'cuid';
import API_ENDPOINT from './config';
import history from './history';

class App extends React.Component {
  state = {
    petType: 'cats',
    user: {
      name: null,
      id: null
    },
    pets: [],
    queue: []
  }

  handleFormSubmit = async (ev) => {
    ev.preventDefault();
    console.log('Form submitted!')
    //prevent default refresh
    //read data off of form submission
    const petType = ev.target.petType.value;
    const userData = {
      name: ev.target.name.value,
      id: cuid()
    }

    const pets = await this.getPetList(petType)
    const user = await this.enqueueUser(petType, userData)
    const queue = await this.checkQueue(petType)

    this.setState({
      pets,
      user,
      queue,
      petType
    })

    history.push('/adopt');
    
  
    //redirect to '/adopt'
  }

  getPetList = (petType) => {
    //send fetch request to endpoint of appropriate petType
    //return json data
    return fetch(`${API_ENDPOINT}/${petType}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      const json = res.json()
      if (!res.ok) {
        throw new Error (json.error)
      }
      return json;
    })
      .catch(err => alert(err))
  }

  adoptPet (petType) {
    //sends fetch request to endpoint of appropriate petType
    //to dequeue the pet & user
    return fetch(`${API_ENDPOINT}/${petType}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        const json = res.json()
        if (!res.ok) {
          throw new Error (json.error)
        }
        return json;
      })
      .catch(err => alert(err))
  }

  enqueueUser (petType, user) {
    //sends name and uuid to enqueue endpoint for users
    return fetch(`${API_ENDPOINT}/users/${petType}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    })
      .then(res => {
        const json = res.json()
        if (!res.ok) {
          throw new Error (json.error)
        }
        return json;
      })
      .catch(err => alert(err))
  }
  
  checkQueue (petType) {
    //sends request to fetch current queue
    return fetch(`${API_ENDPOINT}/users/${petType}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      const json = res.json()
      if (!res.ok) {
        throw new Error (json.error)
      }
      return json;
    })
      .catch(err => alert(err))    
  }

  updateAdoptionPage = async () => {
    const pets = await this.getPetList(this.state.petType)
    const queue = await this.checkQueue(this.state.petType)
    return this.setState({
      pets,
      queue
    })
  }

  render () {
    return (
      <div className="App">

        <Route 
          exact path = '/'
          render={() => <HomePage 
            handleSubmit={this.handleFormSubmit} 
          />} 
        />
        <Route 
          path = '/adopt' 
          render={() => <AdoptionPage 
            pets={this.state.pets} 
            queue={this.state.queue} 
            user={this.state.user} 
            update={this.updateAdoptionPage}
          />} 
        />

      </div>
    );
  }  
}

export default App;
