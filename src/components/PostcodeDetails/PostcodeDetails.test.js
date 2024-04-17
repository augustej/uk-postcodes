import React from "react";
import { render, screen } from "@testing-library/react";
import PostcodeDetails from "./PostcodeDetails";

describe("PostcodeDetails component", () => {
  it("renders nothing when details prop is not provided", () => {
    render(<PostcodeDetails />);
    const cardElement = screen.queryByTestId("postcode-details");
    expect(cardElement).toBeNull();
  });

  it("renders postcode details correctly when details prop is provided", () => {
    const mockDetails = {
      postcode: "SW1A 1AA",
      country: "United Kingdom",
      admin_district: "Westminster",
      longitude: "-0.126236",
      latitude: "51.5002",
    };
    render(<PostcodeDetails details={mockDetails} />);
    const cardElement = screen.getByTestId("postcode-details");
    expect(cardElement).toBeInTheDocument();

    expect(
      screen.getByText(`Country: ${mockDetails.country}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Admin district: ${mockDetails.admin_district}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Longitude: ${mockDetails.longitude}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Latitude: ${mockDetails.latitude}`)
    ).toBeInTheDocument();
  });
});
