import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("employee"); // Default to employee
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store the user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: userType,
      });

      // Redirect to the correct dashboard after sign-up
      if (userType === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/employer-dashboard");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
    </div>
  );
};

export default SignUp;
