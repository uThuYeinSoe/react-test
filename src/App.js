import React, { useState } from "react";
import axios from "axios";

function App() {
  // Create state variables to hold the message and loading state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle the button click
  const handleClick = async () => {
    setLoading(true); // Set loading state to true
    setError(""); // Clear any previous error messages

    try {
      // Make the API request
      const response = await axios.get(
        "http://localhost:8080/api/v1/test/serverTest"
      );
      // Check if the response contains an object with expected properties
      if (typeof response.data === "object") {
        // Extract and set the relevant data to display
        setMessage(
          `Status Code: ${response.data.statusCode}, Message: ${response.data.message}`
        );
      } else {
        // If the response is not an object, just set it directly
        setMessage(response.data);
      }
    } catch (err) {
      setError("Error fetching data"); // Set error message if the request fails
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={handleClick}>Click Me</button>
      {/* Display loading state */}
      {loading && <p>Loading...</p>}
      {/* Display error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display the response message when it exists */}
      {message && <h1>{message}</h1>}
    </div>
  );
}

export default App;
