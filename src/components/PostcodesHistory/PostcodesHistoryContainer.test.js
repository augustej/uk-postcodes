import React from "react";
import { render, screen } from "@testing-library/react";
import PostcodesHistoryContainer from "./PostcodesHistoryContainer";

describe("PostcodesHistoryContainer component", () => {
  it("correctly determines active postcodes", () => {
    const postcodes = ["12345", "67890", "54321"];
    const activePostcode = "12345";
    const showDetails = jest.fn();
    const deleteFromHistory = jest.fn();

    render(
      <PostcodesHistoryContainer
        postcodes={postcodes}
        activePostcode={activePostcode}
        showDetails={showDetails}
        deleteFromHistory={deleteFromHistory}
      />
    );

    const activePostcodeElement = screen.getByTestId("isActive");

    expect(activePostcodeElement).toHaveTextContent(activePostcode);
    expect(activePostcodeElement).not.toHaveTextContent("67890", "54321");
  });
});
