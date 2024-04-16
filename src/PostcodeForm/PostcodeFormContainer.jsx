import React, { useState } from "react";
import PostcodeForm from "./PostcodeForm";

const PostcodeFormContainer = ({ onSubmit }) => {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setPostcode(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postcodeIsValid(postcode)) {
      onSubmit(postcode);
      setPostcode("");
      setError("");
      return;
    }

    setError("Invalid postcode");
  };

  const postcodeIsValid = (postcode) => {
    const UK_POSTCODE_REGEX =
      /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/gm;

    if (UK_POSTCODE_REGEX.test(postcode)) {
      return true;
    }
  };

  return (
    <PostcodeForm
      onSubmit={handleSubmit}
      value={postcode}
      onChange={handleInputChange}
      error={error}
    />
  );
};

export default PostcodeFormContainer;
