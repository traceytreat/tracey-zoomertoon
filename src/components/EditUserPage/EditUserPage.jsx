import React from 'react';
import { useHistory } from 'react-router-dom';
import EditUserForm from '../EditUserForm/EditUserForm';
import BackButton from '../BackButton/BackButton';

function EditUserPage() {
    const history = useHistory();
    return (
        <div>
            <BackButton />
            <EditUserForm />
        </div>
    );

}

export default EditUserPage;