import React from 'react';
import LoginPage from '../components/LoginPage/LoginPage';
import {metadata} from "../layout";
import ReactQueryProvider from '../components/ReactQueryProvider/ReactQueryProvider';

function Login() {
  metadata.title = "Login";
  metadata.description = "Login with an existing account";
  return (
    <ReactQueryProvider>
      <LoginPage />
    </ReactQueryProvider>
  )
}

export default Login;