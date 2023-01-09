import './EditProfileButton.css';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function EditProfileButton() {
    const history = useHistory();
    return (
        <Tooltip placement="top-start" title='Edit Profile'>
            <EditIcon onClick={() => history.push('/edituser')} id="edit-button" />
        </Tooltip>
    )
}

export default EditProfileButton;