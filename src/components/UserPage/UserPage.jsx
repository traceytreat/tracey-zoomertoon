import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const email = 'mailto:' + user.email
  //const profilepic = user.profilepic;
  const defaultcolor = '#' + user.defaultpic.toString(16);
  const profilepic =
    user.profilepic == './images/profilepics/default.svg' ? <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      version="1.1"
      viewBox="0 0 104 94.039"
    >
      <g transform="translate(-53.692 -84.021)">
        <path
          fill={defaultcolor}
          strokeWidth="0.265"
          d="M105.692 84.021a52 52 0 00-52 52 52 52 0 0021.418 42.04 30.942 26.04 0 01-.36-3.745 30.942 26.04 0 0121.27-24.712 18.381 18.381 0 01-8.402-15.42 18.381 18.381 0 0118.38-18.382 18.381 18.381 0 0118.382 18.381 18.381 18.381 0 01-8.552 15.53 30.942 26.04 0 0120.806 24.603 30.942 26.04 0 01-.36 3.745 52 52 0 0021.419-42.04 52 52 0 00-52-52z"
        ></path>
      </g>
    </svg> : <img
      width="200px"
      src={user.profilepic}>
    </img>;
  return (
    <div className="content">
      <div className="container">
        <section className="user-info">
          {profilepic}
          <h3>Contact Info:</h3>
          {user.linkedin && <a href={user.linkedin}>LinkedIn</a>}
          {user.website && <a href={user.website}>Portfolio</a>}
          <a href={email}>Send email to {user.username}</a><br />
          <LogOutButton className="btn" />
        </section>
      </div>
      <div className="container">
        <h2>{user.username}</h2>
        <section className='post-statistics'>
          <h3>Post statistics</h3>
          <p>Graph goes here.</p>
        </section>
        <section className='recent-posts'>
          <h3>Recent Activity</h3>
          <p>Latest posts go here.</p>
        </section>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
