import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import EmailIcon from '@mui/icons-material/Email';
import { Tooltip } from '@mui/material';
import './Socials.css';

//props are username(user.username), linkedin(user.linkedin), website(user.website), email(user.email)
function Socials(props) {
    const mailtoemail = 'mailto:' + props.email;

    return (
        <>
            <h3>Contact Info:</h3>
            <div className='social-bar'>
                <div className='social-icon'>{props.linkedin && <><a href={props.linkedin}><Tooltip placement='bottom' title={'LinkedIn'}><LinkedInIcon fontSize="large" sx={{ color: 'black' }} /></Tooltip></a></>}</div>
                <div className='social-icon'>{props.website && <><a href={props.website}><Tooltip placement='bottom' title='Portfolio'><WebIcon fontSize="large" sx={{ color: 'black' }} /></Tooltip></a></>}</div>
                <div className='social-icon'><a href={mailtoemail}><Tooltip placement='bottom' title={`Send email to ${props.username}`}><EmailIcon fontSize="large" sx={{ color: 'black' }} /></Tooltip></a></div>
            </div>
        </>
    );
}

export default Socials;