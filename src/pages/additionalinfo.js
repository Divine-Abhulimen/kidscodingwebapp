import React, { useState } from "react";
import { database } from "../config";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./css/signin.css";

const AdditionalInfo = ({ user }) => {
  const [name, setName] = useState("");
  const [classesRemaining, setClassesRemaining] = useState("");
  const [waiver, setWaiver] = useState();

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSave = async () => {
    // Create a reference to the 'users' collection in Firestore
    const usersCollection = collection(database, "users");

    try {
      // Set the additional information in Firestore
      const userDocRef = doc(usersCollection, user.uid);
      setWaiver(false);
      
      // Use setDoc to create a new document if it doesn't exist or update the existing document
      await setDoc(userDocRef, {
        name,
        classesRemaining,
        waiver
      });

      // Navigate to the dashboard or any other appropriate page
      navigate("/profile");
    } catch (error) {
      console.error("Error saving additional information:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        {/*Title*/}
        <div className="text">Additional Information</div>
        <div className="underline"></div>
      </div>

      <form className="signin-form">
        <div className="input">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="number"
            value={classesRemaining}
            placeholder="Number of classes remaining"
            onChange={(e) => setClassesRemaining(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button type="button" onClick={handleSave}>
            Save Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdditionalInfo;
