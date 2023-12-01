import React, { useState } from 'react';
// Import in other files
import { auth, app, firebaseConfig, analytics, database } from '../config'; // Adjust the import path accordingly

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      console.log('Password reset email sent successfully.');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
    }
  };

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