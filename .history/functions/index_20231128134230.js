const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createUsersFromSquare = functions.firestore
    .document("square/{documentId}")
    .onCreate(async (snap, context) => {
      console.log("Function triggered on document creation:", context.params.documentId);
      const data = snap.data();
      const { Name, "Last Name": lastName, Email } = data;

      try {
        const userRecord = await admin.auth().createUser({
          email: Email,
          displayName: `${Name} ${lastName}`,
          password: "123456",
        });

        console.log("Successfully created new user:", userRecord.uid);
      } catch (error) {
        console.error("Error creating user:", error);
      }

      return null;
    });
