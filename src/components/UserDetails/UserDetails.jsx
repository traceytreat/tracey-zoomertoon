import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserDetails.css';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import BackButton from '../BackButton/BackButton';
import ProfilePic from '../ProfilePic/ProfilePic';
import Socials from '../Socials/Socials';
import RecentPosts from '../RecentPosts/RecentPosts';
import useReduxStore from '../../hooks/useReduxStore';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { format, parseISO } from 'date-fns';

function UserDetails() {
  const { id } = useParams();
  const userDetails = useSelector((store) => store.userDetails);
  const post = useSelector((store) => store.post);
  const store = useReduxStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_DETAILS', payload: { user_id: id } });
    dispatch({ type: 'FETCH_USER_POSTS', payload: { user_id: id } });
    dispatch({ type: 'FETCH_STATS', payload: { user_id: id } });
    console.log('stats store is', store.stats);

    //const dateForChart = new Date();
    const last7Days = [];
    for (let i = -6; i < 1; i++) {
      last7Days.push(format(((d => new Date(d.setDate(d.getDate() + i)))(new Date)), 'MM/dd/yyyy'));
    }
    //console.log(dateForChart);
    console.log(last7Days);

    const chartData = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < store.stats?.length; j++) {
        if (format(parseISO(store.stats[j]?.date), 'MM/dd/yyyy') == last7Days[i]) {
          chartData[i] = Number(store.stats[j]?.count);
        }
      }
    }
    console.log('chartData is', chartData);


    const ctx = document.getElementById('myChart');
    const myStats = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: last7Days,
        datasets: [{
          label: '# of posts',
          data: chartData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          },

        }
      }
    });
    return () => {
      myStats.destroy()
    }
  }, []);

  const email = 'mailto:' + userDetails[0]?.email

  return (
    <div className="content">
      <BackButton />
      <div className="container">
        <section className="user-info">
          <ProfilePic url={userDetails[0]?.profilepic} num={userDetails[0]?.defaultpic} size='150' cursor='default' />
          {userDetails[0]?.admin &&
            <Tooltip placement='top' title="This user is an Administrator." arrow>
              <div id="admin-badge">
                ADMIN
              </div>
            </Tooltip>}
          <Socials username={userDetails[0]?.username} linkedin={userDetails[0]?.linkedin} website={userDetails[0]?.website} email={userDetails[0]?.email} />
        </section>
      </div>
      <div className="container">
        <h2>{userDetails[0]?.username}</h2>
        <section className='post-statistics'>
          <h3>Post statistics</h3>
          <div id="myChart-container">
            <canvas id="myChart"></canvas>
          </div>
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