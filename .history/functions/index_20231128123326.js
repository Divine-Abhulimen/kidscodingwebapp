// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createUsersFromSquare = functions.firestore
    .document("square/{documentId}")
    .onCreate(async (snap, context) => {
      const data = snap.data();
      const {Name, "Last Name": lastName, Email} = data;

      try {
        const userRecord = await admin.auth().createUser({
          email: Email,
          displayName: `${Name} ${lastName}`,
          password: "12345",
        });

        console.log("Successfully created new user:", userRecord.uid);
      } catch (error) {
        console.error("Error creating user:", error);
      }

      return null;
    });
