import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EditUserForm.css';

function EditUserForm() {
    const user = useSelector((store) => store.user);
    const defaultcolor = '#' + user.defaultpic.toString(16);
    const profilepic =
        user.profilepic == './images/profilepics/default.svg' ? <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            version="1.1"
            viewBox="0 0 104 94.039"
        >
            <g transform="translate(-53.692 -84.021)">
                <path
                    fill={defaultcolor}
                    strokeWidth="0.265"
                    d="M105.692 84.021a52 52 0 00-52 52 52 52 0 0021.418 42.04 30.942 26.04 0 01-.36-3.745 30.942 26.04 0 0121.27-24.712 18.381 18.381 0 01-8.402-15.42 18.381 18.381 0 0118.38-18.382 18.381 18.381 0 0118.382 18.381 18.381 18.381 0 01-8.552 15.53 30.942 26.04 0 0120.806 24.603 30.942 26.04 0 01-.36 3.745 52 52 0 0021.419-42.04 52 52 0 00-52-52z"
                ></path>
            </g>
        </svg> : <img
            width="200px"
            src={user.profilepic}>
        </img>;

    const [linkedin, setLinkedin] = useState(user.linkedin ? user.linkedin : '');
    const [website, setWebsite] = useState(user.website ? user.website : '');
    const [email, setEmail] = useState(user.email);
    const dispatch = useDispatch();

    const saveChanges = (event) => {
        event.preventDefault();

        dispatch({
            type: 'SAVE_CHANGES',
            payload: {
                username: username,
                password: password,
                email: email,
                linkedin: linkedin == '' ? null : linkedin,
                website: website == '' ? null : website,
            },
        });
    };

    return (
        <form className='edit-user-form' onSubmit={saveChanges}>
            <div>
                <h2>Edit Profile</h2>
                {profilepic}<br />
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
                    Email URL:
                    <input
                        type="url"
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