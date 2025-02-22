import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import CharacterDetail from "../pages/CharacterDetails";
import { createTestQueryClient } from "../../setupTests";
import { queryClient } from "../queryClient";

const mockCharacter = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  url: "https://swapi.dev/api/people/1/",
};

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("CharacterDetail", () => {
  let testQueryClient: any;

  beforeEach(() => {
    testQueryClient = createTestQueryClient();
    queryClient.setQueryData(["characters", 1, ""], {
      results: [mockCharacter],
      count: 1,
    });
    vi.clearAllMocks();
  });

  it("renders character details form", () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <CharacterDetail />
      </QueryClientProvider>,
    );

    expect(screen.getByText(`Edit ${mockCharacter.name}`)).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue(mockCharacter.name);
    expect(screen.getByLabelText("Height")).toHaveValue(mockCharacter.height);
  });

  it("handles form submission", async () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <CharacterDetail />
      </QueryClientProvider>,
    );

    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Modified Luke" } });

    const submitButton = screen.getByText("Save Changes");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("shows not found message for invalid character", () => {
    queryClient.clear();

    render(
      <QueryClientProvider client={testQueryClient}>
        <CharacterDetail />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Not Found")).toBeInTheDocument();
    expect(screen.getByText("Sorry,Character not found.")).toBeInTheDocument();
  });

  it("renders all form fields with correct initial values", () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <CharacterDetail />
      </QueryClientProvider>,
    );

    const formFields = [
      "Name",
      "Height",
      "Mass",
      "Hair Color",
      "Skin Color",
      "Eye Color",
      "Birth Year",
      "Gender",
    ];

    formFields.forEach((field) => {
      expect(screen.getByLabelText(field)).toBeInTheDocument();
    });
  });
});
