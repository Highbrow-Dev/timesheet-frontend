import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const EmployerDashboard = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "screenshots"));
        const filesList = querySnapshot.docs.map((doc) => doc.data());
        setFiles(filesList);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchFiles();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/signin");
    });
  };

  return (
    <div>
      <h2>Employer Dashboard</h2>
      <p>Welcome Employer</p>
      {message && <p>{message}</p>}
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <p>Email: {file.email}</p>
            <p>Filename: {file.filename}</p>
            <img src={file.url} alt="Screenshot" width="200" />
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployerDashboard;
