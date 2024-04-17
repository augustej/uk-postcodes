import "./App.css";
import PostcodeFormContainer from "./components/PostcodeForm/PostcodeFormContainer";
import PostcodeDetails from "./components/PostcodeDetails/PostcodeDetails";
import { useState } from "react";

function App() {
  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState({});

  const handleSubmit = (newResult, postcode) => {
    setDetails(newResult);
    setHistory({ ...history, [postcode]: newResult });
  };

  return (
    <>
      <PostcodeFormContainer onSubmit={handleSubmit} />
      <PostcodeDetails details={details} />
    </>
  );
}

export default App;
