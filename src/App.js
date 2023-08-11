import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [responseData, setResponseData] = useState(null);

  const debouncedCallApi = debounce((input) => {
    const apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${input}`;

    fetch(apiEndpoint)
      .then((response) => response.json())

      .then((data) => setResponseData(data))
      .catch((error) => console.error("Error calling API:", error));
  }, 1500);

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    debouncedCallApi(newInputValue);
  };

  useEffect(() => {
    return () => {
      debouncedCallApi.cancel();
    };
  }, []);

  return (
    <div>
      <h1>Debounced API Caller App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter input"
      />
      {responseData && (
        <div>
          <h2>API Response</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
