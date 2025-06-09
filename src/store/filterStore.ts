import { create } from 'zustand';
import { FilterStore, TaskFilter } from '@/types/filter';

const initialState = {
  filter: 'all' as TaskFilter,
};

export const useFilterStore = create<FilterStore>()((set) => ({
  ...initialState,
  setFilter: (filter) => set({ filter }),
})); 