import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EditUserForm.css';

function EditUserForm() {
    const user = useSelector((store) => store.user);
    const defaultcolor = '#' + user.defaultpic.toString(16);
    const profilepic =
        user.profilepic == './images/profilepics/default.svg' ? <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            version="1.1"
            viewBox="0 0 110 110"
        >
            <g transform="translate(-51.614 -63.849)">
                <path
                    fill={defaultcolor}
                    strokeWidth="0.265"
                    d="M106.615 63.849a55 55 0 00-55 55 55 55 0 0055 55 55 55 0 0011.783-1.296 34.64 32.125 0 01-10.01-22.543 34.64 32.125 0 01.794-6.784 24.749 25.866 0 01-4.772.518 24.749 25.866 0 01-24.75-25.866 24.749 25.866 0 0124.75-25.867 24.749 25.866 0 0124.749 25.867 24.749 25.866 0 01-.15 2.772 34.64 32.125 0 0114.017-2.765 34.64 32.125 0 0118.428 4.928 55 55 0 00.16-3.964 55 55 0 00-55-55zm-4.182 38.664a7.455 2.711 44.767 00-.894.34 7.455 2.711 44.767 003.383 7.175 7.455 2.711 44.767 007.202 3.325 7.455 2.711 44.767 00-3.383-7.174 7.455 2.711 44.767 00-6.308-3.666zm15.375 11.765l-.08.084c.068.84.05 1.72-.05 2.646-.09.925-.297 1.91-.62 2.955a15.462 15.462 0 01-1.339 3.057 14.843 14.843 0 01-2.182 2.916c-.911.958-1.85 1.737-2.815 2.336-.96.604-1.955 1.1-2.987 1.489-.987.376-1.965.634-2.932.775-.966.152-1.85.216-2.651.194l-.08.085 1.933 1.822a18.442 18.442 0 005.865-1.534c1.83-.825 3.549-2.08 5.153-3.766 1.605-1.686 2.771-3.462 3.499-5.326a18.206 18.206 0 001.22-5.91zm-27.2.178a7.455 2.711 44.767 00-.894.34 7.455 2.711 44.767 003.384 7.174 7.455 2.711 44.767 007.202 3.326 7.455 2.711 44.767 00-3.384-7.175 7.455 2.711 44.767 00-6.308-3.665z"
                ></path>
            </g>
        </svg> : <img
            width="150px"
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