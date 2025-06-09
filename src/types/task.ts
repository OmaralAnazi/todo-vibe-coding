export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
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
  setFilter: (filter: TaskFilter) => void;
  clearCompleted: () => void;
  
  // Loading state
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
} 