import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import PostcodeForm from "./PostcodeForm";

describe("PostcodeForm component", () => {
  it("renders correctly", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const error = "";

    render(
      <PostcodeForm
        onSubmit={onSubmit}
        value=""
        onChange={onChange}
        error={error}
      />
    );

    expect(screen.getByTestId("postcode-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("calls onSubmit prop when form is submitted", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const error = "";
    const value = "AB12 3CD";

    render(
      <PostcodeForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
        error={error}
      />
    );

    fireEvent.submit(screen.getByTestId("postcode-form"));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("calls onChange prop when input value changes", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const error = "";
    const value = "AB12 3CD";

    render(
      <PostcodeForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
        error={error}
      />
    );

    const input = screen.getByTestId("postcode-input");
    fireEvent.change(input, { target: { value: "AB34 5EF" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("displays error message when error prop is provided", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const error = "Invalid postcode";

    render(
      <PostcodeForm
        onSubmit={onSubmit}
        value=""
        onChange={onChange}
        error={error}
      />
    );

    expect(screen.getByText("Invalid postcode")).toBeInTheDocument();
  });

  it("disables button when input value is empty", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const error = "";
    const value = "";

    render(
      <PostcodeForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
        error={error}
      />
    );

    const button = screen.getByTestId("submit-button");
    expect(button).toBeDisabled();
  });

  it("enables button when input value is not empty", () => {
    const onSubmit = jest.fn();
    const onChange = jest.fn();
    const error = "";
    const value = "AB12 3CD";

    render(
      <PostcodeForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
        error={error}
      />
    );

    const button = screen.getByTestId("submit-button");
    expect(button).toBeEnabled();
  });
});
