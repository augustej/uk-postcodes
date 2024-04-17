import React from "react";

const PostcodeForm = ({ onSubmit, value, onChange, error }) => {
  return (
    <>
      <p>{error}</p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter UK postcode"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PostcodeForm;
