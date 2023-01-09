import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReduxStore from '../../hooks/useReduxStore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import tinycolor2 from "tinycolor2";
import { format, parseISO } from 'date-fns';
import './UserDetails.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function UserDetails() {
    const { id } = useParams();
  const userDetails = useSelector((store) => store.userDetails);
  const store = useReduxStore();
  const post = useSelector((store) => store.post);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_DETAILS', payload: { user_id: id } });
    dispatch({ type: 'FETCH_USER_POSTS', payload: { user_id: id } });
  }, []);

  const email = 'mailto:' + userDetails[0].email
 
  
  
  
  const defaultcolor = '#' + userDetails[0]?.defaultpic.toString(16);
  //const defaultcolor = '#000000';
  const complement = tinycolor2(defaultcolor).complement().toHexString();

  const profilepic =
    userDetails[0]?.profilepic == './images/profilepics/default.svg' ? <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="150"
      style={{ backgroundColor: "#ffffff" }}
      version="1.1"
      viewBox="0 0 110 110"
    >
      <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={defaultcolor} />
        <stop offset="100%" stopColor={complement} />
      </linearGradient>
      <g transform="translate(-51.614 -63.849)">
        <path
          fill="url(#Gradient)"
          strokeWidth="0.265"
          d="M106.615 63.849a55 55 0 00-55 55 55 55 0 0055 55 55 55 0 0011.783-1.296 34.64 32.125 0 01-10.01-22.543 34.64 32.125 0 01.794-6.784 24.749 25.866 0 01-4.772.518 24.749 25.866 0 01-24.75-25.866 24.749 25.866 0 0124.75-25.867 24.749 25.866 0 0124.749 25.867 24.749 25.866 0 01-.15 2.772 34.64 32.125 0 0114.017-2.765 34.64 32.125 0 0118.428 4.928 55 55 0 00.16-3.964 55 55 0 00-55-55zm-4.182 38.664a7.455 2.711 44.767 00-.894.34 7.455 2.711 44.767 003.383 7.175 7.455 2.711 44.767 007.202 3.325 7.455 2.711 44.767 00-3.383-7.174 7.455 2.711 44.767 00-6.308-3.666zm15.375 11.765l-.08.084c.068.84.05 1.72-.05 2.646-.09.925-.297 1.91-.62 2.955a15.462 15.462 0 01-1.339 3.057 14.843 14.843 0 01-2.182 2.916c-.911.958-1.85 1.737-2.815 2.336-.96.604-1.955 1.1-2.987 1.489-.987.376-1.965.634-2.932.775-.966.152-1.85.216-2.651.194l-.08.085 1.933 1.822a18.442 18.442 0 005.865-1.534c1.83-.825 3.549-2.08 5.153-3.766 1.605-1.686 2.771-3.462 3.499-5.326a18.206 18.206 0 001.22-5.91zm-27.2.178a7.455 2.711 44.767 00-.894.34 7.455 2.711 44.767 003.384 7.174 7.455 2.711 44.767 007.202 3.326 7.455 2.711 44.767 00-3.384-7.175 7.455 2.711 44.767 00-6.308-3.665z"
        ></path>
      </g>
    </svg> : <img
      width="150px"
      src={userDetails[0]?.profilepic}>
    </img>;

  return (
    <div className="content">
      <div className="back-button">
        <div data-backbutton="Back to Main Feed">
          <ArrowCircleLeftIcon style={{ fontSize: "72px", color: "white", cursor: "pointer" }} onClick={() => history.push('/feed')} />
        </div>
      </div>
      <div className="container">
        <section className="user-info">
          {profilepic}
          {userDetails[0]?.admin &&
            <Tooltip placement='top' title="This user is an Administrator." arrow>
              <div id="admin-badge">
                ADMIN
              </div>
            </Tooltip>}
          <h3>Contact Info:</h3>
          {userDetails[0]?.linkedin && <><a href={userDetails[0]?.linkedin}>LinkedIn</a><br /></>}
          {userDetails[0]?.website && <><a href={userDetails[0]?.website}>Portfolio</a><br /></>}
          <a href={userDetails[0]?.email}>Send email to {userDetails[0]?.username}</a><br />
        </section>
      </div>
      <div className="container">
        <h2>{userDetails[0].username}</h2>
        <section className='post-statistics'>
          <h3>Post statistics</h3>
          <p>Graph goes here.</p>
        </section>
        <section className='recent-posts'>
          <h3>Recent Activity</h3>
          {post.length === 0 ? `No posts yet :(` :
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Post</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {post.map((row) => (
                    <TableRow
                      key={row.posts_id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                      {format(parseISO(row?.date), 'MM/dd/yyyy hh:mm a')}
                      </TableCell>
                      <TableCell><Link to={row?.reply_to ? `/details/${row.reply_to}` : `/details/${row?.posts_id}`}>{row?.path ? 'Drawing Post' : (row?.reply_to ? 'Reply: ' + row?.text : 'Text Post: ' + row?.text)}</Link></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }

        </section>
      </div>
    </div>

  );
  
}

// this allows us to use <App /> in index.js
export default UserDetails;