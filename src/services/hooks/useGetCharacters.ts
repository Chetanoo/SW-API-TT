import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../api.ts";

export const useGetCharacters = ({
  page,
  search,
}: {
  page: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["characters", page, search],
    queryFn: () => getCharacters(page, search),
    enabled: !!page,
  });
};
