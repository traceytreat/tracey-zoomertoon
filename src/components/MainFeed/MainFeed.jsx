import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import useReduxStore from '../../hooks/useReduxStore';
import LogOutButton from '../LogOutButton/LogOutButton';
import tinycolor2 from "tinycolor2";
import { format, parseISO } from 'date-fns';
import Masonry from 'react-masonry-css'
import HelpIcon from '@mui/icons-material/Help';
import { Grid, Tooltip, Card, CardContent } from '@mui/material';
import './MainFeed.css';

// This is the main feed of the app.
// There is a sidebar on the left side with user info
// and the posts are displayed on the right side.
function MainFeed() {
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const store = useReduxStore();
    const dispatch = useDispatch();

    // Code for masonry layout
    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };

    // Code for default profile pic. Not used if user has their own profile pic
    const defaultcolor = '#' + user.defaultpic.toString(16);
    const complement = tinycolor2(defaultcolor).complement().toHexString();

    const profilepic =
        user.profilepic == './images/profilepics/default.svg' ? <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            onClick={() => history.push('/user')}
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
            onClick={() => history.push('/user')}
            src={user.profilepic}>
        </img>;

    // Code for return to top button.
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > 100 ? true : false);
        console.log('in toggleVisible')
    };
    const returnToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    window.addEventListener('scroll', toggleVisible);


    useEffect(() => {
        dispatch({ type: 'FETCH_POINTS', payload: {user_id: user.id} });
        dispatch({ type: 'FETCH_POSTS' });
        console.log('store is', store.post);
    }, []);

    return (
        <div className='feed-container'>
            <section id="sidebar">
                <div id="profilepic" data-tooltip="View Profile">{profilepic}</div>
                <h2>{user.username}</h2>
                <Grid container spacing={0.5} direction="row" alignItems="center" justifyContent="center">
                    <Grid item>
                        <span id="points">Points: {store.points[0]?.count}</span>
                    </Grid>
                    <Grid item>
                        <Tooltip placement="right" title="Your Points = How many posts you have made + How many loves you've gotten" arrow>
                            <HelpIcon fontSize="small" color='black' />
                        </Tooltip>
                    </Grid>
                </Grid>
                {user.admin && <button className='btn' onClick={() => history.push('/admin')}>Admin Dashboard</button>}
                <button className='btn' onClick={() => history.push('/newpost')}>+New Post</button>
                <LogOutButton className="btn" />
            </section>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="main-feed"
                columnClassName="main-feed-column">
                {store.post.map((item, index) => {
                    return (
                        <Card className="main-feed-post" sx={{ width: 275 }} key={index}>
                            <CardContent>
                                <div className='post-header'>
                                    On {format(parseISO(item.date), 'MM/dd/yyyy')} at {format(parseISO(item.date), 'hh:mm a')},<br />
                                    {item.username} shared a {item.path ? 'drawing' : 'text'} post:
                                </div>
                                <Tooltip placement="top-start" title='Click to view' followCursor>
                                    <div onClick={() => history.push('/details/' + item.posts_id)}className='post-preview'>
                                        {item.path ? <img width='250' src={item.path} /> : <h3>{item.text}</h3>}
                                    </div>
                                </Tooltip>
                            </CardContent>
                        </Card>
                    );
                })}
            </Masonry>
            <div className='return-to-top' onClick={returnToTop} style={{ display: visible ? 'block' : 'none' }}>
                Return to Top
            </div>
        </div>
    );
}

export default MainFeed;