import React from "react";
import './NewPostPage.css';
import bg from '../../img/paper.jpeg';

function NewPostPage() {
    //User chooses which type of post to create.
    return (
        <div className="container">
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
    );
}

export default NewPostPage;