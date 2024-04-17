import "./App.css";
import { useState, useCallback } from "react";
import PostcodeFormContainer from "./components/PostcodeForm/PostcodeFormContainer";
import PostcodeDetails from "./components/PostcodeDetails/PostcodeDetails";
import PostcodesHistory from "./components/PostcodesHistory/PostcodesHistory";

function App() {
  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = useCallback(
    (newResult, postcode) => {
      setDetails(newResult);
      if (!history.find((entry) => entry.postcode === postcode)) {
        setHistory([...history, { postcode, details: newResult }]);
      }
    },
    [history]
  );

  const handleHistoryClick = useCallback(
    (postcode) => {
      const selected = history.find((entry) => entry.postcode === postcode);
      if (selected) {
        setDetails(selected.details);
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

  return (
    <>
      <PostcodeFormContainer onSubmit={handleSubmit} />
      <PostcodeDetails details={details} />
      <PostcodesHistory
        postcodes={history.map((entry) => entry.postcode)}
        showDetails={handleHistoryClick}
        deleteFromHistory={handleDeleteFromHistory}
      />
    </>
  );
}

export default App;
