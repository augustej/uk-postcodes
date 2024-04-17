import "./App.css";
import { useState, useCallback } from "react";
import PostcodeFormContainer from "./components/PostcodeForm/PostcodeFormContainer";
import PostcodeDetails from "./components/PostcodeDetails";
import PostcodesHistoryContainer from "./components/PostcodesHistory/PostcodesHistoryContainer";

function App() {
  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = useCallback(
    (newResult) => {
      setDetails(newResult);
      if (!history.find((entry) => entry.postcode === newResult.postcode)) {
        setHistory([...history, newResult]);
      }
    },
    [history]
  );

  const handleHistoryClick = useCallback(
    (postcode) => {
      const selected = history.find((entry) => entry.postcode === postcode);
      if (selected) {
        setDetails(selected);
      }
    },
    [history]
  );

  const handleDeleteFromHistory = useCallback(
    (postcode) => {
      setHistory(history.filter((entry) => entry.postcode !== postcode));
    },
    [history]
  );

  const handleClearDetails = useCallback(() => {
    setDetails(null);
  }, []);

  return (
    <>
      <h1>Postcode Finder</h1>
      <div className="postcode-layout">
        <div>
          <PostcodeFormContainer
            onSubmit={handleSubmit}
            clearDetails={handleClearDetails}
          />
          <PostcodeDetails details={details} />
        </div>
        <PostcodesHistoryContainer
          postcodes={history.map((entry) => entry.postcode)}
          showDetails={handleHistoryClick}
          deleteFromHistory={handleDeleteFromHistory}
          activePostcode={details?.postcode}
        />
      </div>
    </>
  );
}

export default App;
