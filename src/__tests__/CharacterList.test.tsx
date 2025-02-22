import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import CharacterList from "../pages/CharacterList";
import { createTestQueryClient } from "../../setupTests";

vi.mock("../services/hooks/useGetCharacters", () => ({
  useGetCharacters: vi.fn(),
}));

import { useGetCharacters } from "../services/hooks/useGetCharacters";

const mockCharactersData = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      birth_year: "19BBY",
      gender: "male",
      url: "https://swapi.dev/api/people/1/",
    },
  ],
};

describe("CharacterList", () => {
  let queryClient: any;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    (useGetCharacters as any).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const loadingSpinner = screen.getByRole("loading-skeleton");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders character cards after loading", () => {
    (useGetCharacters as any).mockReturnValue({
      data: mockCharactersData,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const cardTitle = screen.getByText("Luke Skywalker");
    expect(cardTitle).toBeInTheDocument();
  });

  it("handles search input", async () => {
    (useGetCharacters as any).mockReturnValue({
      data: mockCharactersData,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const searchInput = screen.getByPlaceholderText("Search characters...");
    fireEvent.change(searchInput, { target: { value: "Luke" } });

    await waitFor(() => {
      expect(searchInput).toHaveValue("Luke");
    });
  });

  it("shows empty state when no results", () => {
    (useGetCharacters as any).mockReturnValue({
      data: { ...mockCharactersData, results: [] },
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const emptyMessage = screen.getByText("No characters found");
    expect(emptyMessage).toBeInTheDocument();
  });
});
