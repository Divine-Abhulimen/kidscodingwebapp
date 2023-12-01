import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import "./pages/css/signin.css";

const CourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [courseLength, setCourseLength] = useState(0);
  const [courseDescription, setCourseDescription] = useState("");
  const [requiredAge, setRequiredAge] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Add Course</div>
        <div className="underline"></div>
      </div>

      <form className="signin-form" onSubmit={handleSubmit}>
        {/*Course name field*/}
        <div className="input">
          <input
            type="text"
            placeholder="Course name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="input">
          {/*Course length field*/}
          <input
            type="number"
            placeholder="Course length (in hours)"
            value={courseLength == "" ? "" : courseLength}
            onChange={(e) => setCourseLength(e.target.value)}
            required
          />
        </div>

        <div className="input">
          {/*Course description field*/}
          <input
            type="text"
            placeholder="Course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>

        <div className="input">
          {/*Course age field*/}
          <input
            type="number"
            placeholder="Required age"
            value={requiredAge == "" ? "" : requiredAge}
            onChange={(e) => setRequiredAge(e.target.value)}
            required
          />
        </div>

        <div className="btn-container">
          {/*Sign-in button*/}
          <button className="signin-btn" type="button" onClick={handleSubmit}>
            Add course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
