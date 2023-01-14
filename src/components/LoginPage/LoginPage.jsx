import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div className='login-container'>
      <LoginForm />
      <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          New to Zoomertoon? Click here to register!
        </button>
      <center>
      </center>
    </div>
  );
}

export default LoginPage;
