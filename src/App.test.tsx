import { render, screen } from "@testing-library/react";
import HomePage from "./pages/HomePage";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({
  data: {
    items: [
      {
        id: 1,
        name: "Test Repo",
        description: "This is a test repo",
        stargazers_count: 42,
        html_url: "https://github.com/test/repo",
        owner: {
          login: "testuser",
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        },
      },
    ],
    total_count: 1,
  },
});

test("renders HomePage heading and sample repo", async () => {
  render(<HomePage />);
  expect(
    await screen.findByText(/GitHub Trending Repositories/i)
  ).toBeInTheDocument();
  expect(await screen.findByText(/Test Repo/i)).toBeInTheDocument();
});
