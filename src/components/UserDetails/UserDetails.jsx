import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserDetails.css';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import BackButton from '../BackButton/BackButton';
import ProfilePic from '../ProfilePic/ProfilePic';
import RecentPosts from '../RecentPosts/RecentPosts';

function UserDetails() {
    const { id } = useParams();
  const userDetails = useSelector((store) => store.userDetails);
  const post = useSelector((store) => store.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_DETAILS', payload: { user_id: id } });
    dispatch({ type: 'FETCH_USER_POSTS', payload: { user_id: id } });
  }, []);

  const email = 'mailto:' + userDetails[0]?.email

  return (
    <div className="content">
      <BackButton />
      <div className="container">
        <section className="user-info">
        <ProfilePic url={userDetails[0]?.profilepic} num={userDetails[0]?.defaultpic} size='150' cursor='default'/>
          {userDetails[0]?.admin &&
            <Tooltip placement='top' title="This user is an Administrator." arrow>
              <div id="admin-badge">
                ADMIN
              </div>
            </Tooltip>}
          <h3>Contact Info:</h3>
          {userDetails[0]?.linkedin && <><a href={userDetails[0]?.linkedin}>LinkedIn</a><br /></>}
          {userDetails[0]?.website && <><a href={userDetails[0]?.website}>Portfolio</a><br /></>}
          <a href={email}>Send email to {userDetails[0]?.username}</a><br />
        </section>
      </div>
      <div className="container">
        <h2>{userDetails[0]?.username}</h2>
        <section className='post-statistics'>
          <h3>Post statistics</h3>
          <p>Graph goes here.</p>
        </section>
        <section className='recent-posts'>
          <h3>Recent Activity</h3>
          <RecentPosts post={post} />
        </section>
      </div>
    </div>

  );
  
}

// this allows us to use <App /> in index.js
export default UserDetails;