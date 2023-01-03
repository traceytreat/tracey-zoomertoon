import React from "react";

function NewPostPage() {
    //User chooses which type of post to create.
    return (
        <div className="container">
            <h2>Create New Post</h2>
            <button className="btn">
                New Drawing
            </button>
            <button className="btn">
                New Writing Prompt
            </button>
        </div>
    );
}

export default NewPostPage;