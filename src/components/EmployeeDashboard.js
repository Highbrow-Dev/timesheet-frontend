import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, db } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const storageRef = ref(storage, `screenshots/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress here if needed
      },
      (error) => {
        setMessage(`Error: ${error.message}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, "screenshots"), {
            url: downloadURL,
            email: user.email,
            filename: file.name,
            timestamp: Date.now(),
          })
            .then(() => {
              setMessage("File uploaded successfully.");
            })
            .catch((error) => {
              setMessage(`Error: ${error.message}`);
            });
        });
      }
    );
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/signin"); // Redirect to sign-in page after logout
    });
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <p>Welcome Employee</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Timesheet Screenshot</button>
      {message && <p>{message}</p>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default EmployeeDashboard;
