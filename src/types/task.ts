export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Filter = 'all' | 'active' | 'completed';

export type SortOption = 
  | 'date-desc'  // Newest first
  | 'date-asc'   // Oldest first
  | 'alpha-asc'  // A to Z
  | 'alpha-desc' // Z to A
  | 'completed'; // Completed tasks last

export interface TaskState {
  tasks: Task[];
  filter: Filter;
  sortOption: SortOption;
  isLoading: boolean;
  error: string | null;
}

export interface TaskStore extends TaskState {
  // Task actions
  addTask: (title: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
  
  // Filter actions
  setFilter: (filter: Filter) => void;
  setSortOption: (option: SortOption) => void;
  clearCompleted: () => void;
  
  // Loading state
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Task counts
  getActiveTasksCount: () => number;
  getCompletedTasksCount: () => number;
} 