import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostcodeFormContainer from "./PostcodeFormContainer";
import {
  validatePostcode,
  fetchPostcodeData,
} from "../../services/PostcodeService";

jest.mock("../../services/PostcodeService");

describe("PostcodeFormContainer", () => {
  beforeEach(() => {
    validatePostcode.mockReset();
    fetchPostcodeData.mockReset();
  });

  it("renders without crashing", () => {
    render(<PostcodeFormContainer />);
  });

  it("submits valid postcode and calls onSubmit", async () => {
    const onSubmit = jest.fn();
    const clearDetails = jest.fn();
    const postcode = "SW1A 1AA";
    validatePostcode.mockResolvedValue({ result: true });
    fetchPostcodeData.mockResolvedValue({
      result: {
        country: "United Kingdom",
        longitude: -0.141587,
        latitude: 51.501009,
        codes: { admin_district: "Westminster" },
      },
    });

    render(
      <PostcodeFormContainer onSubmit={onSubmit} clearDetails={clearDetails} />
    );
    const input = screen.getByTestId("postcode-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: postcode } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(validatePostcode).toHaveBeenCalledWith(postcode);
    });
  });

  it("submits valid postcode and fetches postcode data", async () => {
    const onSubmit = jest.fn();
    const clearDetails = jest.fn();
    const postcode = "SW1A 1AA";
    validatePostcode.mockResolvedValue({ result: true });
    fetchPostcodeData.mockResolvedValue({
      result: {
        country: "United Kingdom",
        longitude: -0.141587,
        latitude: 51.501009,
        codes: { admin_district: "Westminster" },
      },
    });

    render(
      <PostcodeFormContainer onSubmit={onSubmit} clearDetails={clearDetails} />
    );
    const input = screen.getByTestId("postcode-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: postcode } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchPostcodeData).toHaveBeenCalledWith(postcode);
    });
  });

  it("submits valid postcode and calls onSubmit with correct data", async () => {
    const onSubmit = jest.fn();
    const clearDetails = jest.fn();
    const postcode = "SW1A 1AA";
    validatePostcode.mockResolvedValue({ result: true });
    fetchPostcodeData.mockResolvedValue({
      result: {
        country: "United Kingdom",
        longitude: -0.141587,
        latitude: 51.501009,
        codes: { admin_district: "Westminster" },
      },
    });

    render(
      <PostcodeFormContainer onSubmit={onSubmit} clearDetails={clearDetails} />
    );
    const input = screen.getByTestId("postcode-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: postcode } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          country: "United Kingdom",
          longitude: -0.141587,
          latitude: 51.501009,
          admin_district: "Westminster",
          postcode: "SW1A 1AA",
        },
        "SW1A 1AA"
      );
    });
  });

  it("displays error message for invalid postcode", async () => {
    const onSubmit = jest.fn();
    const clearDetails = jest.fn();
    const postcode = "InvalidPostcode";
    validatePostcode.mockResolvedValue({
      result: false,
      message: "Invalid postcode",
    });

    render(
      <PostcodeFormContainer onSubmit={onSubmit} clearDetails={clearDetails} />
    );
    const input = screen.getByTestId("postcode-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: postcode } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid postcode")).toBeInTheDocument();
    });
  });

  it("displays error message and does not call onSubmit for invalid postcode", async () => {
    const onSubmit = jest.fn();
    const clearDetails = jest.fn();
    const postcode = "InvalidPostcode";
    validatePostcode.mockResolvedValue({
      result: false,
      message: "Invalid postcode",
    });

    render(
      <PostcodeFormContainer onSubmit={onSubmit} clearDetails={clearDetails} />
    );
    const input = screen.getByTestId("postcode-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: postcode } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it("calls clearDetails for invalid postcode", async () => {
    const onSubmit = jest.fn();
    const clearDetails = jest.fn();
    const postcode = "InvalidPostcode";
    validatePostcode.mockResolvedValue({
      result: false,
      message: "Invalid postcode",
    });

    render(
      <PostcodeFormContainer onSubmit={onSubmit} clearDetails={clearDetails} />
    );
    const input = screen.getByTestId("postcode-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(input, { target: { value: postcode } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(clearDetails).toHaveBeenCalled();
    });
  });
});
