import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import Nav from '../Nav/Nav';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className='landing-page'>
      <Nav />
      <div className="landing-page-container">
        <h2 className="big-text">PRACTICE <br/>
        <span style = {{marginLeft: 45 + 'px'}}>& GROW</span> <br/>
        <span style = {{marginLeft: 100 + 'px'}}>(& GO)</span></h2>
        <h3 className="small-text">Create and participate in bite-size challenges to hone your drawing and writing skills.</h3>
        
      </div>
    </div>
  );
}

export default LandingPage;
