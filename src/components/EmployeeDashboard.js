import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const EmployeeDashboard = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>Welcome Employee</p>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button disabled>Not logged in</button>
      )}
    </div>
  );
};

export default EmployeeDashboard;
