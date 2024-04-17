const PostcodesHistory = ({ postcodes, showDetails, deleteFromHistory }) => {
  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {postcodes.map((postcode, index) => (
          <li key={index}>
            <button onClick={() => showDetails(postcode)}>{postcode}</button>
            <button onClick={() => deleteFromHistory(postcode)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostcodesHistory;
