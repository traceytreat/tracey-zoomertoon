import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import './PostDetails.css';
import { toast } from 'react-toastify';
import BackButton from '../BackButton/BackButton';

function PostDetails() {
    const { id } = useParams();
    const user = useSelector((store) => store.user);
    const post = useSelector((store) => store.post);
    const reply = useSelector((store) => store.reply);
    const loves = useSelector((store) => store.loves).map(love => love.posts_id);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_REPLIES', payload: { posts_id: id } });
        dispatch({ type: 'FETCH_LOVES', payload: { user_id: user.id } });
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
                dispatch({ type: 'ADD_FLAG', payload: { posts_id: posts_id, action: 'add' } });
                toast.success("Thanks for reporting this post. It will be reviewed.");
                history.push('/feed');
            }
        })
    }

    const handleReply = (posts_id) => {
        Swal.fire({
            title: 'Think of your best caption for this image!',
            imageUrl: post[0].path,
            imageWidth: 300,
            input: 'textarea',
            required: true
        }).then((result) => {
            if (result.isDismissed == false && result.value != '') {
                dispatch({
                    type: 'ADD_REPLY',
                    payload:
                    {
                        user_id: user.id,
                        posts_id: posts_id,
                        text: result.value
                    }
                });
                dispatch({ type: 'FETCH_REPLIES', payload: { user_id: user.id } })
                toast.success("Successfully posted")
            } else if (result.isDismissed == false) {
                toast.error("Error: Cannot submit an empty reply.")
            }
        })
    }

    const handleDeletePost = (posts_id, postType) => {
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
                dispatch({ type: 'DELETE_POST', payload: { posts_id: posts_id } });
                dispatch({ type: 'FETCH_REPLIES', payload: { posts_id: id } });
                dispatch({ type: 'FETCH_POST_DETAILS', payload: { posts_id: id } });
                toast.success("Deleted post"); //set timer for this
                if (postType == 'post'){
                    dispatch({ type: 'FETCH_POSTS', payload: { posts_id: id } });
                    history.push('/feed');
                }
            }
        })
    }

    const handleAddLove = (posts_id) => {
        dispatch({ type: 'ADD_LOVE', payload: { user_id: user.id, posts_id: posts_id } });
        //dispatch({ type: 'FETCH_REPLIES', payload: { posts_id: id } });
        //dispatch({ type: 'FETCH_POST_DETAILS', payload: { posts_id: id } });
    }

    const handleRemoveLove = (posts_id) => {
        dispatch({ type: 'REMOVE_LOVE', payload: { user_id: user.id, posts_id: posts_id } });
        //dispatch({ type: 'FETCH_REPLIES', payload: { posts_id: id } });
        //dispatch({ type: 'FETCH_POST_DETAILS', payload: { posts_id: id } });
    }

    const handleDrawingReply = async (posts_id) => {
        const { value: file } = await Swal.fire({
            title: 'Draw a picture according to the caption below!',
            text: post[0]?.text,
            input: 'file',
            inputAttributes: {
                'accept': 'image/png, image/jpeg, image/jpg',
                'aria-label': 'Upload a drawing'
            },
            preConfirm: (file) => {
                let formData = new FormData();
                formData.append("drawing", file);
                formData.append("posts_id", posts_id);
                axios.post('/api/user/upload/drawingreply', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    console.log('Reply upload success');
                    location.reload();
                }).catch((err) => {
                    console.log('Reply upload fail', err);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'FETCH_REPLIES', payload: { posts_id: id } });
                dispatch({ type: 'FETCH_POST_DETAILS', payload: { posts_id: id } });
                toast.success('Successfully updated');
            }
        })
    }


    console.log(user);
    return (
        <>
            <BackButton />
            <div className="post-details-content">
                <h3><Link to={post[0]?.user_id == user.id ? `/user` : `/profile/${post[0]?.user_id}`}>{post[0]?.username}</Link> posted a {post[0]?.path ? 'drawing' : 'text'} on {post[0] ? format(parseISO(post[0]?.date), 'MM/dd/yyyy') : ''} at {post[0] ? format(parseISO(post[0]?.date), 'hh:mm a') : ''}</h3>
                {post[0]?.path ? <img width='350' src={post[0]?.path} /> : <p>{post[0]?.text}</p>}
                <br />
                {(user?.id != post[0]?.user_id) && ((loves.includes(post[0]?.posts_id)) ? <button onClick={() => handleRemoveLove(post[0]?.posts_id)}>Unlove this</button> : <button onClick={() => handleAddLove(post[0]?.posts_id)}>Love this</button>)}
                {user?.id != post[0]?.user_id && <button onClick={() => handleReportPost(post[0]?.posts_id)}>Report</button>}
                {user?.id == post[0]?.user_id && <button onClick={() => handleDeletePost(post[0]?.posts_id, 'post')}>Delete this post</button>}

            </div>
            <h4>{reply.length == 0 ? 'No replies yet...be the first!' : 'Replies:'}</h4>
            {post[0]?.user_id != user?.id ? (post[0]?.path ? <button onClick={() => handleReply(post[0]?.posts_id)}>Reply</button> : <button onClick={() => handleDrawingReply(post[0]?.posts_id)}>Reply</button>) : '(you can\`t reply to your own post!)'}
            <ul id='reply-list'>
                {reply?.map((r) => (
                    <li key={r?.posts_id}>
                        <b><Link to={r?.user_id == user.id ? `/user` : `/profile/${r?.user_id}`}>{r?.username}</Link>: {r?.text ? r?.text : <img width='250' src={r?.path} />}</b>
                        {(user?.id != r?.user_id) && ((loves.includes(r?.posts_id)) ? <button onClick={() => handleRemoveLove(r?.posts_id)}>Unlove this</button> : <button onClick={() => handleAddLove(r?.posts_id)}>Love this</button>)}
                        {user?.id != r?.user_id && <button onClick={() => handleReportPost(r?.posts_id)}>Report</button>}
                        {user?.id == r?.user_id && <button onClick={() => handleDeletePost(r?.posts_id, 'reply')}>Delete this post</button>}
                    </li>
                ))}
            </ul>
            {/*<p>{JSON.stringify(reply)}</p>*/}
        </>
    );

}

export default PostDetails;