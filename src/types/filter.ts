export type TaskFilter = 'all' | 'active' | 'completed';

export interface FilterState {
  filter: TaskFilter;
}

export interface FilterStore extends FilterState {
  setFilter: (filter: TaskFilter) => void;
} 