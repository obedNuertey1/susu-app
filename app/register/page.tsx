import React from 'react'
import RegisterPage from "../components/RegisterPage/RegisterPage";
import { metadata } from '../layout';
import ReactQueryProvider from '../components/ReactQueryProvider/ReactQueryProvider';


const Register = () => {

  metadata.title = "Register";
  metadata.description = "Register an Account";


  return (
    <ReactQueryProvider>
      <RegisterPage />
    </ReactQueryProvider>
  )
}

export default Register