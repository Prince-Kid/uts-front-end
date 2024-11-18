import React from "react";
import { render, screen } from "@testing-library/react";
import Check from "../pages/Check";

describe("Test component", () => {
  test("renders content", () => {
    render(<Check />);

    const heading = screen.getByText(
      /If you want to part of the program click button below/i
    );
    expect(heading).toBeTruthy();

    const button = screen.getByRole("button", { name: /confirm/i });
    expect(button).toBeTruthy();
  });

  test("Greetings", () => {
    render(<Check />);
    const secondHeading = screen.getByText(/hello there/i);
    expect(secondHeading).toBeTruthy();
  });
});
