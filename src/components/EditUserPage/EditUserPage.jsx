import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import EditUserForm from '../EditUserForm/EditUserForm';

function EditUserPage() {
    const history = useHistory();
    return (
        <div>
            <div className="back-button">
                <div data-backbutton="Back to Profile Page">
                    <ArrowCircleLeftIcon style={{ fontSize: "72px", color: "white", cursor: "pointer" }} onClick={() => history.push('/user')} />
                </div>
            </div>
            <EditUserForm />
        </div>
    );

}

export default EditUserPage;