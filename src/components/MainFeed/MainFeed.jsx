import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import useReduxStore from '../../hooks/useReduxStore';
import LogOutButton from '../LogOutButton/LogOutButton';
import { format, parseISO } from 'date-fns';
import Masonry from 'react-masonry-css'
import ProfilePic from '../ProfilePic/ProfilePic';
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
        dispatch({ type: 'FETCH_POINTS', payload: { user_id: user.id } });
        dispatch({ type: 'FETCH_POSTS' });
        console.log('store is', store.post);
    }, []);

    return (
        <div className='feed-container'>
            <section id="sidebar">
                <Tooltip placement="right" title="View Profile" followCursor>
                    <Link to='/user'><ProfilePic url={user.profilepic} num={user.defaultpic} size='200' cursor='pointer' /></Link>
                </Tooltip>
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
                                    <Link to={item.user_id == user.id ? `/user` : `/profile/${item.user_id}`}>{item.username}</Link> shared a {item.path ? 'drawing' : 'text'} post:
                                </div>
                                <Tooltip placement="top-start" title='Click to view' followCursor>
                                    <div onClick={() => history.push('/details/' + item.posts_id)} className='post-preview'>
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