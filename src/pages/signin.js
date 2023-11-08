import React, { useState } from "react";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "./css/signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        {/*Title*/}
        <div className="text">Sign in</div>
        <div className="underline"></div>
      </div>

      <form className="signin-form">
        {/*Email field*/}
        <div className="input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input">
          {/*Password field*/}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="btn-container">
          {/*Sign-in button*/}
          <button className="signin-btn" type="button" onClick={handleSignIn}>
            Sign In
          </button>
        </div>

        <div className="links">
          {/*Sign-up page redirection*/}
          <p>
            Don't have an account?<Link className="link" to="/signup">Sign up</Link>
          </p>
          <p>
            Forgot your password?<Link className="link" to="/signup">Forgot password</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
