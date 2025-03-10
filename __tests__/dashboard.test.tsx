import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DashboardScreen from "../app/dashboard";
import { useNews } from "../api/useNewsQuery";

jest.mock("../api/useNewsQuery", () => ({
  useNews: jest.fn(),
}));

describe("DashboardScreen Component", () => {
  beforeEach(() => {
    (useNews as jest.Mock).mockReset();
  });

  it("renders loading indicator while fetching news", () => {
    (useNews as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: [],
    });

    const { getByTestId, unmount } = render(<DashboardScreen />);

    expect(getByTestId("loading-indicator")).toBeTruthy();
    unmount();
  });

  it("renders error message when news fetching fails", () => {
    (useNews as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: [],
    });
    const { getByText, unmount } = render(<DashboardScreen />);
    expect(getByText("Error loading news")).toBeTruthy();
    unmount();
  });

  it("renders news items when data is available", async () => {
    (useNews as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: "1",
          headline: "Test News Headline",
          image: "https://example.com/news.jpg",
          source: "Test Source",
          datetime: 1710028800,
          url: "https://example.com",
        },
      ],
    });

    const { getByText, unmount } = render(<DashboardScreen />);
    await waitFor(() => {
      expect(getByText("Test News Headline")).toBeTruthy();
    });
    unmount();
  });

  it("navigates to news URL when an article is clicked", () => {
    (useNews as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        {
          id: "1",
          headline: "Test News Headline",
          image: "https://test.com/news.jpg",
          source: "Test Source",
          datetime: 1710028800,
          url: "https://test.com",
        },
      ],
    });

    const { getByText, unmount } = render(<DashboardScreen />);
    const newsItem = getByText("Test News Headline");
    fireEvent.press(newsItem);
    unmount();
  });
});
