import React, { useState } from 'react';
// Import in other files
import { auth, app, firebaseConfig, analytics, database } from '../config'; // Adjust the import path accordingly

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (data) => {
    if (data && data.email) { sendPasswordResetEmail(auth, data.email)
    .then(() => {
    setModalAlertMessage("Email has been sent!")
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    setModalAlertMessage(errorMessage);
    })
    } else { console.log('Data or email is undefined'); } };

  return (
    <div>
      <h2>Forgot Password</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ForgotPassword;