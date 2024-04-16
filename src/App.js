import "./App.css";
import PostcodeFormContainer from "./PostcodeForm/PostcodeFormContainer";

function App() {
  return <PostcodeFormContainer onSubmit={console.log} />;
}

export default App;
