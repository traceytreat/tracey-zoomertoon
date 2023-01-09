import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ProfilePic from '../ProfilePic/ProfilePic';

import './EditUserForm.css';

function EditUserForm() {
    const user = useSelector((store) => store.user);

    const [linkedin, setLinkedin] = useState(user.linkedin ? user.linkedin : '');
    const [website, setWebsite] = useState(user.website ? user.website : '');
    const [email, setEmail] = useState(user.email);
    const history = useHistory();
    const dispatch = useDispatch();

    const saveChanges = (event) => {
        event.preventDefault();

        dispatch({
            type: 'SAVE_CHANGES',
            payload: {
                email: email,
                linkedin: linkedin == '' ? null : linkedin,
                website: website == '' ? null : website,
            },
        });
        toast.success("Changes applied")
        history.push('/user');
    };

    return (
        <form className='edit-user-form' onSubmit={saveChanges}>
            <div>
                <h2>Edit Profile</h2>
                <ProfilePic url={user.profilepic} num={user.defaultpic} size='150' cursor='default'/><br />
            </div>
            <div>
                <label htmlFor='linkedin'>
                    LinkedIn URL:
                    <input
                        type="url"
                        name="linkedin"
                        value={linkedin}
                        onChange={(event) => setLinkedin(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor='portfolio'>
                    Portfolio URL:
                    <input
                        type="url"
                        name="portfolio"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor='email'>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        required
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <input className="btn" type="submit" name="submit" value="Save Changes" />
            </div>
        </form>
    );
}

export default EditUserForm;