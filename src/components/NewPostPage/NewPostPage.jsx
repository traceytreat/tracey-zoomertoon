import React from "react";
import './NewPostPage.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useHistory } from "react-router-dom";

function NewPostPage() {
    const history = useHistory();
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
                    <button className="btn">
                        New Drawing
                    </button>
                    <h3>-or-</h3>
                    <button className="btn">
                        New Writing Prompt
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewPostPage;