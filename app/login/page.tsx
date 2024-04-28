import React from 'react';
import LoginPage from '../components/LoginPage/LoginPage';
import {metadata} from "../layout";

function Login() {
  metadata.title = "Login";
  metadata.description = "Login with an existing account";
  return (
    <>
      <LoginPage />
    </>
  )
}

export default Login;