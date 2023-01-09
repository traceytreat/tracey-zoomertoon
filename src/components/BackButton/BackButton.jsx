import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
    const history = useHistory();
    return (
        <div className="back-button">
            <Tooltip placement="right-start" title="Back to Previous Page">
                <ArrowCircleLeftIcon style={{ fontSize: "72px", color: "white", cursor: "pointer" }} onClick={() => history.goBack()} />
            </Tooltip>
        </div>
    );
}

export default BackButton;