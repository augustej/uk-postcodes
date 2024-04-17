import React, { useState, useEffect } from "react";
import PostcodeForm from "./PostcodeForm";
import {
  validatePostcode,
  fetchPostcodeData,
} from "../../services/PostcodeService";

const PostcodeFormContainer = ({
  onSubmit,
  clearDetails,
  showDetailsClicked,
}) => {
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");

  // click on "View" in history should clear the form
  useEffect(() => {
    const resetFormData = () => {
      setPostcode("");
      setError("");
    };

    resetFormData();
  }, [showDetailsClicked]);

  const handleInputChange = (e) => {
    setPostcode(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await postcodeIsValid(postcode)) {
      const details = await getPostcodeDetails(postcode);
      onSubmit(details, postcode);
      setPostcode("");
      return;
    }

    clearDetails();
  };

  const postcodeIsValid = async (postcode) => {
    try {
      const { result } = await validatePostcode(postcode);
      setError(result ? "" : "Invalid postcode");
      return result;
    } catch (error) {
      setError(`Validation error: ${error.message}`);
      return false;
    }
  };

  const getPostcodeDetails = async (postcode) => {
    try {
      const { result } = await fetchPostcodeData(postcode);
      const { country, longitude, latitude, codes } = result;
      return {
        country,
        longitude,
        latitude,
        admin_district: codes.admin_district,
        postcode,
      };
    } catch (error) {
      setError(`Postcode error: ${error.message}`);
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
