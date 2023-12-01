
import React, { useState, useEffect } from "react";
import { auth, database } from "../config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidepanel from "./side-bar";
import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";
import "./css/profile.css";
import Waiver from "../waiver";
import { createUsersFromFirestore } from './Newuser.js';


const Profile = () => {
  {
    /*Waiver form*/
  }

  const [showWaiver, setShowWaiver] = useState(true);
  const closeWaiver = () => {
    setShowWaiver(false);
  };

  const [userData, setUserData] = useState(() => {
    const cachedUserData = localStorage.getItem('userData');
    return cachedUserData ? JSON.parse(cachedUserData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [scannedData, setScannedData] = useState('');

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(database, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const newUserData = userDoc.data();
          setUserData(newUserData);
          localStorage.setItem('userData', JSON.stringify(newUserData));
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [auth.currentUser?.uid]);

  const handleMarkAttendance = async () => {
    // Deduct a class from classesRemaining
    const updatedClassesRemaining = userData.classesRemaining - 1;

    try {
      const userDocRef = doc(database, 'users', auth.currentUser.uid);
      await updateDoc(userDocRef, { classesRemaining: updatedClassesRemaining });

      // Fetch user data to update the displayed data
      await fetchUserData();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const generateQRCodeValue = () => {
    // Generate a unique value, e.g., based on timestamp
    return new Date().toISOString();
  };

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data);
      // Perform any additional logic with the scanned data
      // For example, you can update the UI or call the handleMarkAttendance function

      // Simulate an action based on the scanned data (replace with your logic)
      console.log('Scanned data:', data);

      // Mark attendance when a specific condition is met (replace with your logic)
      if (data === generateQRCodeValue()) {
        await handleMarkAttendance();
      }
    }
  };

  return (
    <div className="waiver-popup">
      {showWaiver && <Waiver onClose={closeWaiver} />}

      {!showWaiver && (
        <div className="profile-content">
          <Sidepanel />

          {loading ? (
          <p>Loading...</p>
        ) : (
          auth.currentUser && (
            <div className="profile-container">
              <div className="profile-info">
                <h2 id="username">Hello {userData?.name || auth.currentUser.displayName}</h2>
                <p>Email: {auth.currentUser.email}</p>
                <p>Number of Classes Remaining: {userData?.classesRemaining || 'N/A'}</p>
              </div>
              <div className="profile-qr-btns">
                {/* <button onClick={handleMarkAttendance} className='profile-btns'>Mark Attendance</button> */}

                <div>
                  {/* Display QR code for scanning */}
                  {/* <QRCode value={generateQRCodeValue()} /> */}
                </div>
              </div>
            </div>


          )
        )}
        </div>
      )}
    </div>

  );
};

createUsersFromFirestore();

export default Profile;
