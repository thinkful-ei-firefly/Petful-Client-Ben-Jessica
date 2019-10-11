import React from 'react';

class HomePage extends React.Component {
  
  render () {
    return (
      <div>
          <h1>Welcome to Petful!</h1>
          <img 
            src="https://wishbonepetrescue.org/wp-content/uploads/sites/45/2014/10/Wishbone-Adopt-homepg-2.jpg"
            alt="Adopt a Pet! Banner, with dogs and cats posing."
          />
          <h2>Here at Petful, we believe that every animal deserves a loving home.</h2>
          <p>
            We've partnered with animal rescue to find precious pets a forever home. 
            We work strictly on a first-in, first-out basis. 
            If you're interested in adoption, please fill out the form below and adopt a pet today!
          </p>
          <form onSubmit={(ev) => this.props.handleSubmit(ev)}>
            <legend>Adopt a Pet!</legend>
            <label htmlFor="name">What is your Name? </label>
            <input type="text" id="name" name="name" required />
            <p>What kind of animal are you hoping to adopt?</p>
            <label htmlFor="cat">Cat</label>
            <input type="radio" id="cat" value="cat" name="petType" required/>
            <label htmlFor="dog">Dog</label>
            <input type="radio" id="dog" value="dog" name="petType"/>
            <button type="submit">Adopt Now!</button>
          </form>
      </div>
    )
  }    
}

export default HomePage