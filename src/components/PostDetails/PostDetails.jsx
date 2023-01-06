import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Swal from 'sweetalert2';
import './PostDetails.css';
import { toast } from 'react-toastify';

function PostDetails() {
    const { id } = useParams();
    const user = useSelector((store) => store.user);
    const post = useSelector((store) => store.post);
    const reply = useSelector((store) => store.reply);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_REPLIES', payload: { posts_id: id } });
        dispatch({ type: 'FETCH_POST_DETAILS', payload: { posts_id: id } });
    }, []);

    const handleReportPost = (posts_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This post will be reported",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Report'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: 'ADD_FLAG', payload: {posts_id: posts_id, action: 'add'}});
                toast.success("Thanks for reporting this post. It will be reviewed.");
                history.push('/feed');
            }
          })
    }
    
    const handleDeletePost = (posts_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be reversed",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: 'DELETE_POST', payload: {posts_id: posts_id}});
                toast.success("Deleted post");
                history.push('/feed');
            }
          })
    }
    

    console.log(user);
    return (
        <>
            <div className="back-button">
                <div data-backbutton="Back to Main Feed">
                    <ArrowCircleLeftIcon style={{ fontSize: "72px", color: "white", cursor: "pointer" }} onClick={() => history.push('/feed')} />
                </div>
            </div>
            <div className="post-details-content">

                {/*<p>{JSON.stringify(post)}</p>*/}
                <h3>{post[0]?.username} posted a {post[0]?.path ? 'drawing' : 'writing prompt'} on {post[0]?.date}</h3>
                {post[0]?.path ? <img width='350' src={post[0]?.path} /> : <p>{post[0]?.text}</p>}
                <br/>
                {user?.id != post[0]?.user_id && <button onClick={() =>  handleReportPost(post[0]?.posts_id)}>Report</button>}
                {user?.id == post[0]?.user_id && <button onClick={() => handleDeletePost(post[0]?.posts_id)}>Delete this post</button>}

            </div>
            <h4>{reply.length == 0 ? 'No replies yet...be the first!' : 'Replies:'}</h4>
            <ul id='reply-list'>
                {reply?.map((r) => (
                    <li key={r?.posts_id}>
                        <b>{r?.username}: {r?.text ? r?.text : <img width='250' src={r?.path} /> }</b> 
                        {user?.id != r?.user_id && <button onClick={() =>  handleReportPost(r?.posts_id)}>Report</button>}
                        {user?.id == r?.user_id && <button onClick={() => handleDeletePost(r?.posts_id)}>Delete this post</button>}
                    </li>
                ))}
            </ul>
            {/*<p>{JSON.stringify(reply)}</p>*/}
        </>
    );

}

export default PostDetails;