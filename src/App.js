import "./App.css";
import { useState, useCallback, useRef } from "react";
import PostcodeFormContainer from "./components/PostcodeForm/PostcodeFormContainer";
import PostcodeDetails from "./components/PostcodeDetails/PostcodeDetails";
import PostcodesHistoryContainer from "./components/PostcodesHistory/PostcodesHistoryContainer";
import useShowDetailsClicked from "./hooks/useShowDetailsClicked";

function App() {
  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState([]);
  const searchHistoryRef = useRef(null);
  const showDetailsClicked = useShowDetailsClicked(searchHistoryRef);

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
      <h1>Postcode Lookup</h1>
      <div className="postcode-layout">
        <div>
          <PostcodeFormContainer
            onSubmit={handleSubmit}
            clearDetails={handleClearDetails}
            showDetailsClicked={showDetailsClicked}
          />
          <PostcodeDetails details={details} />
        </div>
        <div ref={searchHistoryRef}>
          <PostcodesHistoryContainer
            postcodes={history.map((entry) => entry.postcode)}
            showDetails={handleHistoryClick}
            deleteFromHistory={handleDeleteFromHistory}
            activePostcode={details?.postcode}
          />
        </div>
      </div>
    </>
  );
}

export default App;
