import React from "react";
import './NewPostPage.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPostPage() {
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const newDrawing = () => {
        Swal.fire({
            showConfirmButton: false,
            html:
                `<form action="/api/user/upload/post" method="post" enctype="multipart/form-data">
                    <input type="file" accept="image/png, image/jpeg, image/jpg" name="drawing" />
                    <input type="submit" value="Upload"/>  
                </form>`
        })
    }

    const newText = () => {
        Swal.fire({
            input: 'textarea',
            required: true
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
                dispatch({type: 'FETCH_POINTS', payload: {user_id : user.id}})
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
            <div className="back-button">
                <div data-backbutton="Back to Main Feed">
                    <ArrowCircleLeftIcon style={{ fontSize: "72px", color: "white", cursor: "pointer" }} onClick={() => history.push('/feed')} />
                </div>
            </div>
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
                </div>
            </div>
        </div>
    );
}

export default NewPostPage;