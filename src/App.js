import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import AdoptionPage from './AdoptionPage';
import cuid from 'cuid';
import { API_ENDPOINT } from './config';

class App extends React.Component {
  state = {
    user: {
      name: 'Ben',
      id: '5279hv87eyg39vh'
    },
    pets: [
      {
        imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
        imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
        name: 'Fluffy',
        sex: 'Female',
        age: 2,
        breed: 'Bengal',
        story: 'Thrown on the street'
      },
      {
        imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
        imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
        name: 'Zeus',
        sex: 'Male',
        age: 3,
        breed: 'Golden Retriever',
        story: 'Owner Passed away'
      }
    ],
    queue: [
      {
        name: 'Jessica',
        id: 'b8234897g9qe98y'
      },
      {
        name: 'Ben',
        id: '5279hv87eyg39vh'
      }
    ]
  }

  handleFormSubmit (ev) {
    ev.preventDefault();
    console.log('Form submitted!')
    //prevent default refresh
    //read data off of form submission
    const petType = ev.target.petType.value;    
    const user = {
      name: ev.target.name.value,
      id: cuid()
    }
    
  
    //fetch pets of appropriate type and add to state
    //enqueue user to appropriate endpoint
    //redirect to '/adopt'
  }

  getPetList (petType) {
    //send fetch request to endpoint of appropriate petType
    //return json data
    fetch(`API_ENDPOINT/${petType}`, {
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
    fetch(`API_ENDPOINT/${petType}`, {
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
    fetch(`API_ENDPOINT/${petType}`, {
      method: 'POST',
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
  
  checkQueue () {
    //sends request to fetch current queue
  }

  render () {
    return (
      <div className="App">
        <Route 
          exact path = '/'
          render={() => <HomePage handleSubmit={this.handleFormSubmit} />} 
        />
        <Route 
          path = '/adopt' 
          render={() => <AdoptionPage pets={this.state.pets} queue={this.state.queue} user={this.state.user} />} 
        />
      </div>
    );
  }  
}

export default App;
