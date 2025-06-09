import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskFilter, TaskStore } from '@/types/task';

const initialState = {
  tasks: [],
  filter: 'all' as TaskFilter,
  isLoading: false,
  error: null,
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addTask: (title: string) => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
          ),
        }));
      },
      deleteTask: id => {
        set(state => ({ tasks: state.tasks.filter(task => task.id !== id) }));
      },
      toggleTask: id => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
          ),
        }));
      },
      reorderTasks: (startIndex, endIndex) => {
        const tasks = [...get().tasks];
        const [removed] = tasks.splice(startIndex, 1);
        tasks.splice(endIndex, 0, removed);
        set({ tasks });
      },
      setFilter: filter => set({ filter }),
      clearCompleted: () => {
        set(state => ({ tasks: state.tasks.filter(task => !task.completed) }));
      },
      setLoading: isLoading => set({ isLoading }),
      setError: error => set({ error }),
    }),
    {
      name: 'todo-storage',
      partialize: state => ({ tasks: state.tasks, filter: state.filter }),
    }
  )
); 