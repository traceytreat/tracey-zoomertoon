import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
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

    const handleProfileUpload = async () => {
        const { value: file } = await Swal.fire({
            title: 'Upload a new profile pic',
            text: 'Choose an image file.',
            input: 'file',
            inputAttributes: {
                'accept': 'image/png, image/jpeg, image/jpg',
                'aria-label': 'Upload a profile pic'
            },
            preConfirm: (file) => {
                let formData = new FormData();
                formData.append("pic", file);
                dispatch({type: 'UPLOAD_PROFILE_PIC', payload: formData});
                /*
                axios.post('/api/user/upload/profilepic', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((result) => {
                    console.log('Profile pic upload success');
                    //location.reload();
                }).catch((err) => {
                    console.log('Profile pic upload fail', err);
                });
                */
            }
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success('Successfully updated');
            }
        })
    }

    return (
        <div className='edit-user-form'>
            <div key={user.profilepic}>
                <h2>Edit Profile</h2>
                <ProfilePic url={user.profilepic} num={user.defaultpic} size='150' cursor='default' /><br />
            </div>
            <div>
                <button onClick={handleProfileUpload}>Upload Profile Pic</button>
                {(user.profilepic != './images/profilepics/default.svg') && <button onClick={() => dispatch({type: 'RESET_PROFILE_PIC'})}>Reset Profile Pic</button>}
            </div>
            <form onSubmit={saveChanges}>
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
        </div>
    );
}

export default EditUserForm;