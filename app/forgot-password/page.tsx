import React from 'react';
import ForgotPasswordPage from '../components/ForgotPasswordPage/ForgotPasswordPage';
import { metadata } from '../layout';

function page() {
    metadata.description = "Enter the email for the account you have with Msys to be served an email to set your password";
    metadata.title = "Msys - Forgot Password";
  return (
    <>
    {/* @ts-ignore */}
        <ForgotPasswordPage />
    </>
  )
}

export default page;