import React, { useState } from "react";
import { getAuth } from "firebase/auth";

const UploadScreenshot = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const auth = getAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("screenshot", file);

    const token = await auth.currentUser.getIdToken();

    try {
      const response = await fetch(
        "http://localhost:5001/api/upload-screenshot",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("File uploaded successfully");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload Screenshot</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadScreenshot;
