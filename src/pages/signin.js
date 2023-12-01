import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import { auth, database } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import "./css/signup.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully

      // Fetch user data
      const userDocRef = doc(database, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check last login time
        const lastLogin = userData.lastLogin?.toDate();
        const currentTime = new Date();

        // Calculate time difference in hours
        const timeDifferenceInHours =
          Math.abs(currentTime - lastLogin) / (60 * 60 * 1000);

        // If it's the first login of the day or more than 24 hours have passed
        if (!lastLogin || timeDifferenceInHours > 24) {
          // Deduct a class and update last login time
          const updatedClassesRemaining = userData.classesRemaining - 1;
          await updateDoc(userDocRef, {
            classesRemaining: updatedClassesRemaining,
            lastLogin: serverTimestamp(), // Update last login time
          });
        }
      }

      navigate("/profile"); // Navigate to the profile page
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
          <p>
            Don't have an account? <Link className="link" to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
