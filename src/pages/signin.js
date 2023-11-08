import React from "react";

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";


function signin() {
  const firebaseConfig = {
    // ...
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return (
    <div>
      <div className="title">
        <span>Login below</span>
      </div>
      <div className="container">
        <div className="login-form">
          <form action="#">
            <input type="email" className="field" placeholder="Email" />
            <input type="password" className="field" placeholder="Password" />
            <a href="#" style={{ width: "110%" }}>
              Forgot password?
            </a>
            <button type="submit">Login</button>
            <span>OR</span>
            <button type="button">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default signin;
