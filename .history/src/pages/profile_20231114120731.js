import React, { useState, useEffect } from 'react';
import { auth, database } from '../config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Sidepanel from './side-bar';
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-reader';
import './css/profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(() => {
    const cachedUserData = localStorage.getItem('userData');
    return cachedUserData ? JSON.parse(cachedUserData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
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

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      setShowScanner(false);
      // Perform any additional logic with the scanned data
      // For example, you can update the UI or call the handleMarkAttendance function
    }
  };

  const handleError = (error) => {
    console.error('QR code scan error:', error);
  };

  return (
    <div className='profile-content'>
      <Sidepanel />
      {loading ? (
        <p>Loading...</p>
      ) : (
        auth.currentUser && (
          <div>
            <h2>Hello {userData?.name || auth.currentUser.displayName}</h2>
            <p>Email: {auth.currentUser.email}</p>
            <p>Number of Classes Remaining: {userData?.classesRemaining || 'N/A'}</p>

            <button onClick={handleMarkAttendance}>Mark Attendance</button>

            <div>
              {/* Display QR code for scanning */}
              <QRCode value="data-to-be-encoded" />
              <button onClick={() => setShowScanner(true)}>Scan QR Code</button>
            </div>

            {/* QR code scanner */}
            {showScanner && (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
