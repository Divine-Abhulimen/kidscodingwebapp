import React, { useState, useEffect } from "react";
import { auth, database } from "../config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Sidepanel from "./side-bar";
import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";
import "./css/profile.css";
import Waiver from "../waiver";

const Profile = () => {
  {
    /*Waiver form*/
  }

  const [showWaiver, setShowWaiver] = useState(true);
  const closeWaiver = () => {
    setShowWaiver(false);
  };

  const [userData, setUserData] = useState(() => {
    const cachedUserData = localStorage.getItem("userData");
    return cachedUserData ? JSON.parse(cachedUserData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState("");

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const newUserData = userDoc.data();
          setUserData(newUserData);
          localStorage.setItem("userData", JSON.stringify(newUserData));
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
      const userDocRef = doc(database, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        classesRemaining: updatedClassesRemaining,
      });

      // Fetch user data to update the displayed data
      await fetchUserData();
    } catch (error) {
      console.error("Error marking attendance:", error);
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
    console.error("QR code scan error:", error);
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
                  <h2 id="username">
                    Hello {userData?.name || auth.currentUser.displayName}
                  </h2>
                  <p>Email: {auth.currentUser.email}</p>
                  <p>
                    Number of Classes Remaining:{" "}
                    {userData?.classesRemaining || "N/A"}
                  </p>
                </div>
                <div className="profile-qr-btns">
                  <button
                    className="profile-btns"
                    onClick={handleMarkAttendance}
                  >
                    Mark Attendance
                  </button>

                  {/* Display QR code for scanning */}
                  <QRCode value="data-to-be-encoded" />
                  <button
                    className="profile-btns"
                    onClick={() => setShowScanner(true)}
                  >
                    Scan QR Code
                  </button>

                  {/* QR code scanner */}
                  {showScanner && (
                    <QrReader
                      delay={300}
                      onError={handleError}
                      onScan={handleScan}
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
