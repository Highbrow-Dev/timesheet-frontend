import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const ViewScreenshots = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [message, setMessage] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchScreenshots = async () => {
      const token = await auth.currentUser.getIdToken();

      try {
        const response = await fetch("http://localhost:5001/api/screenshots", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setScreenshots(result.files);
        } else {
          setMessage(`Error: ${result.error}`);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    fetchScreenshots();
  }, []);

  return (
    <div>
      <h2>Uploaded Screenshots</h2>
      {message && <p>{message}</p>}
      <ul>
        {screenshots.map((file) => (
          <li key={file._id}>
            <img
              src={`http://localhost:5001/${file.path}`}
              alt="Screenshot"
              width="200"
            />
            <p>{file.filename}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewScreenshots;
