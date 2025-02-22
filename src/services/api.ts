import axios from "axios";
import { CharacterResponse } from "../types";

const api = axios.create({
  baseURL: "https://swapi.dev/api",
});

export const getCharacters = async (
  page: number = 1,
  search: string = "",
): Promise<CharacterResponse> => {
  const { data } = await api.get<CharacterResponse>("/people", {
    params: {
      page,
      search,
    },
  });
  return data;
};
