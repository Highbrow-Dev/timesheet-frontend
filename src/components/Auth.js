import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("employee"); // Default to employee
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Store the user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: userType,
      });

      console.log("User role stored in Firestore");

      // Automatically log in the user after sign-up
      await handleSignIn();
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Fetch the user role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User data from Firestore:", userData);

        // Display welcome message based on the user's role
        if (userData.role === "employee") {
          setMessage("Welcome Employee");
        } else if (userData.role === "employer") {
          setMessage("Welcome Employer");
        } else {
          setMessage("Role not recognized");
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Firebase Authentication</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="employer">Employer</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>

      {message && <h3>{message}</h3>}
    </div>
  );
};

export default Auth;
