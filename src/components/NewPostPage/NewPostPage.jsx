import React from "react";
import './NewPostPage.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from "../BackButton/BackButton";

function NewPostPage() {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();


    const experimental = () => {
        console.log('clicked')
    }
    const newDrawing = async () => {
        const { value: file } = await Swal.fire({
            title: 'Upload a drawing post',
            text: 'Please review our rules before posting.',
            input: 'file',
            inputAttributes: {
                'accept': 'image/png, image/jpeg, image/jpg',
                'aria-label': 'Upload a drawing post'
            },
            preConfirm: (file) => {
                let formData = new FormData();
                formData.append("drawing", file);
                //formData.append("text", 'test');
                axios.post('/api/user/upload/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    dispatch({type:'FETCH_POSTS'});
                    console.log('Post upload success');
                }).catch((err) => {
                    console.log('Post upload fail', err);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success('Successfully posted');
                history.push('/feed');
            }
        })
        /*
        if (file) {
            let formData = new FormData();
            formData.append("drawing", file);
            axios.post('/api/user/upload/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((result) => {

                //toast.success("Successfully posted");
                console.log('Post upload success');
                //history.push('/feed');
            })
                .catch((err) => {
                    console.log('Post upload fail', err);
                });


        }
        Swal.fire({ title: "Successfully posted" }).then((result) => {
            console.log('im here');
            history.push('/feed');
        })*/

    }


    const newText = () => {
        Swal.fire({
            title: 'Upload a text prompt',
            text: 'Please review our rules before posting.',
            input: 'textarea',
        }).then((result) => {
            if (result.isDismissed == false && result.value != '') {
                dispatch({
                    type: 'ADD_POST',
                    payload:
                    {
                        user_id: user.id,
                        post_type: 'post',
                        text: result.value
                    }
                });
                dispatch({ type: 'FETCH_POINTS', payload: { user_id: user.id } })
                toast.success("Successfully posted")
                history.push('/feed');
            } else if (result.isDismissed == false) {
                toast.error("Error: Cannot submit an empty post.")
            }
        })
    }

    //User chooses which type of post to create.
    return (
        <div className="bg">
            <BackButton />
            <div className="newpost-container">
                <div className="choose-post-type">
                    <h2>Create New Post</h2>
                    <button onClick={newDrawing} className="btn">
                        New Drawing
                    </button>
                    <h3>-or-</h3>
                    <button onClick={newText} className="btn">
                        New Text Post
                    </button>
                    {/*
                    <button onClick={experimental}>
                        Experimental Features
    </button>*/}
                </div>
            </div>
        </div>
    );
}

export default NewPostPage;