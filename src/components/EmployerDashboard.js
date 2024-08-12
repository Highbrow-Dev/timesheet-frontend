import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const EmployerDashboard = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      <h2>Employer Dashboard</h2>
      <p>Welcome Employer</p>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button disabled>Not logged in</button>
      )}
    </div>
  );
};

export default EmployerDashboard;
