import React from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function signup() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    return (
        <div>signup</div>
    )
}

export default signup