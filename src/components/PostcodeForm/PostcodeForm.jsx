import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const PostcodeForm = ({ onSubmit, value, onChange, error }) => {
  return (
    <>
      <form onSubmit={onSubmit} className="mt-4" data-testid="postcode-form">
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Enter UK postcode"
            aria-label="UK postcode"
            aria-describedby="basic-addon2"
            data-testid="postcode-input"
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            disabled={!value.trim()}
            data-testid="submit-button"
          >
            Submit
          </button>
        </div>
      </form>
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default PostcodeForm;
