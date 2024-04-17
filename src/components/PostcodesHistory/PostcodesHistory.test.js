import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostcodesHistory from "./PostcodesHistory";

describe("PostcodesHistory component", () => {
  const mockPostcodes = ["SW1A 1AA", "EC1A 1BB", "WC1A 1CC"];
  const mockIsActive = jest.fn();
  const mockShowDetails = jest.fn();
  const mockDeleteFromHistory = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders postcodes history correctly", () => {
    render(
      <PostcodesHistory
        postcodes={mockPostcodes}
        isActive={mockIsActive}
        showDetails={mockShowDetails}
        deleteFromHistory={mockDeleteFromHistory}
      />
    );

    const historyElement = screen.getByText("Search History");
    expect(historyElement).toBeInTheDocument();

    mockPostcodes.forEach((postcode) => {
      const postcodeElement = screen.getByText(postcode);
      expect(postcodeElement).toBeInTheDocument();
    });
  });

  it("calls showDetails callback when View button is clicked", () => {
    render(
      <PostcodesHistory
        postcodes={mockPostcodes}
        isActive={mockIsActive}
        showDetails={mockShowDetails}
        deleteFromHistory={mockDeleteFromHistory}
      />
    );

    const viewButton = screen.getAllByText("View")[0];
    fireEvent.click(viewButton);
    expect(mockShowDetails).toHaveBeenCalledWith(mockPostcodes[0]);
  });

  it("calls deleteFromHistory callback when Remove button is clicked", () => {
    render(
      <PostcodesHistory
        postcodes={mockPostcodes}
        isActive={mockIsActive}
        showDetails={mockShowDetails}
        deleteFromHistory={mockDeleteFromHistory}
      />
    );

    const removeButton = screen.getAllByText("Remove")[0];
    fireEvent.click(removeButton);
    expect(mockDeleteFromHistory).toHaveBeenCalledWith(mockPostcodes[0]);
  });

  it("renders nothing when no postcodes provided", () => {
    render(
      <PostcodesHistory
        postcodes={[]}
        isActive={mockIsActive}
        showDetails={mockShowDetails}
        deleteFromHistory={mockDeleteFromHistory}
      />
    );

    const historyElement = screen.queryByText("Search History");
    expect(historyElement).not.toBeInTheDocument();
  });
});
