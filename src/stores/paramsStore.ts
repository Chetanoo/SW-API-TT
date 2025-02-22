import { create } from "zustand";

type ParamsState = {
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  resetParams: () => void;
};

export const useParamsStore = create<ParamsState>((set) => ({
  page: 1,
  search: "",

  setPage: (page) => set(() => ({ page })),
  setSearch: (search) => set(() => ({ search })),
  resetParams: () => set(() => ({ page: 1, search: "" })),
}));
