import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>Thank you!</h1>
        <h2>Technologies used</h2>
        <ul>
          <li>HTML/CSS/JS</li>
          <li>Node</li>
          <li>Express</li>
          <li>Postgres, PostgreSQL, Postico</li>
          <li>React</li>
          <li>Redux, redux sagas</li>
          <li>Passport</li>
          <li>Sweetalert2</li>
          <li>react-toastify</li>
          <li>chart.js</li>
          <li>multer</li>
          <li>Material UI</li>
          <li>tinycolor2</li>
        </ul>
        <h2>Other credits</h2>
        <ul>
          <li>Front page image: SVG Repo</li>
          <li>Front page fonts were made by me</li>
          <li>Drawings made by me</li>
        </ul>
        <h2>Special thanks</h2>
        <ul>
          <li>Family and friends</li>
          <li>Shawl</li>
          <li>Prime staff and instructors</li>
        </ul>
        <h2>Let's connect</h2>
        <ul>
          <li>LinkedIn: https://www.linkedin.com/in/traceystreat/</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
