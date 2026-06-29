import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
describe("HomePage", () => {
  it("renders the input and button", () => {
    render(<HomePage />);
    expect(
      screen.getByPlaceholderText("Enter URL to shorten"),
    ).toBeInTheDocument();
    expect(screen.getByText("Shorten URL")).toBeInTheDocument();
  });
});
