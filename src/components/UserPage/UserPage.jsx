import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import './UserPage.css';
import { Tooltip } from '@mui/material';
import BackButton from '../BackButton/BackButton';
import Socials from '../Socials/Socials';
import RecentPosts from '../RecentPosts/RecentPosts';
import ProfilePic from '../ProfilePic/ProfilePic';
import EditProfileButton from '../EditProfileButton/EditProfileButton';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';


function UserPage() {
  const user = useSelector((store) => store.user);
  const store = useReduxStore();
  const dispatch = useDispatch();
  const [statsTable, setStatsTable] = useState('stats-hidden');
  const [statsButton, setStatsButton] = useState('stats-visible');
  let myStats;



  const handleShowStats = () => {
    //const dateForChart = new Date();
    const last7Days = [];
    //let myStats;
    for (let i = -6; i < 1; i++) {
      last7Days.push(format(((d => new Date(d.setDate(d.getDate() + i)))(new Date)), 'MM/dd/yyyy'));
    }
    //console.log(dateForChart);
    console.log(last7Days);
    console.log('store.stats is', store.stats);
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
    myStats = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: last7Days,
        datasets: [{
          label: `# of posts by ${user?.username}`,
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
    setStatsTable('stats-visible');
    setStatsButton('stats-hidden');
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_DETAILS', payload: { user_id: user.id } });
    dispatch({ type: 'FETCH_USER_POSTS', payload: { user_id: user.id } });
    dispatch({ type: 'FETCH_USER_AWARDS', payload: {user_id: store.user.id} });
    dispatch({ type: 'FETCH_STATS', payload: { user_id: user.id } });
    console.log('stats store is', store.stats);

    return () => {
      myStats.destroy()
    }
  }, []);

  const handleAwardClick = (awardName, description, path) => {
    Swal.fire({
      imageUrl: path,
      showConfirmButton: false,
      //showCancelButton: false,
      title: awardName,
      html: `<i>${description}</i>`
    })
  }

  return (
    <div className="content">
      <BackButton />
      <div className="container">
        <section className="user-info">
          <EditProfileButton />
          <ProfilePic url={user.profilepic} num={user.defaultpic} size='150' cursor='default' />
          {user.admin &&
            <Tooltip placement='top' title="This user is an Administrator." arrow>
              <div id="admin-badge">
                ADMIN
              </div>
            </Tooltip>}
          <Socials username={user.username} linkedin={user.linkedin} website={user.website} email={user.email} />
        </section>
      </div>
      <div className="container">
        <h2>{user.username}</h2>
        <section className='post-statistics'>
          <h3>Post statistics</h3>
          <button className={statsButton} onClick={handleShowStats}>Click to Show Stats</button>
          <div className={statsTable} id="myChart-container">
            <canvas id="myChart"></canvas>
          </div>
        </section>
        <section className='recent-posts'>
          <h3>Recent Activity</h3>
          <RecentPosts post={store.post} />

        </section>
        <h3>My Inventory</h3>
        <section className='user-treasures'>
          {store.userAwards.map(award => {
            return (
              <div className='award' key={award.id}>
                <img onClick={() => handleAwardClick(award.name, award.description, award.path)} src={award.path} />
              </div>
            )
          })}
        </section>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
