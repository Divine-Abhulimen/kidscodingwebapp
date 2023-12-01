import React, { useState, useEffect } from "react";
import { auth, database } from "../config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import Sidepanel from "./side-bar";
import "./css/profile.css";
import Waiver from "../waiver";

const Profile = () => {
  const [userData, setUserData] = useState(() => {
    const cachedUserData = localStorage.getItem("userData");
    return cachedUserData ? JSON.parse(cachedUserData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [showWaiver, setShowWaiver] = useState(false);

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

          // Check if the user has signed the waiver
          if (!newUserData.waiver || newUserData.waiver !== "signed") {
            // If not signed, set state to show the waiver
            setShowWaiver(true);
          }
        } else {
          // If user data document doesn't exist, create it with waiver field
          await setDoc(userDocRef, { waiver: false });
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

  return (
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
              <button onClick={handleMarkAttendance} className="profile-btns">
                Mark Attendance
              </button>
            </div>
          </div>
        )
      )}

      {userData?.waiver === false && <Waiver />}
    </div>
  );
};

export default Profile;
