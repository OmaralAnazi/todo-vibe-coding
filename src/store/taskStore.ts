import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskFilter, TaskStore, SortOption } from '@/types/task';
import { arrayMove } from 'array-move';

const initialState = {
  tasks: [],
  filter: 'all' as TaskFilter,
  sortOption: 'date-desc' as SortOption,
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
      reorderTasks: (oldIndex, newIndex) => {
        const tasks = [...get().tasks];
        const [removed] = tasks.splice(oldIndex, 1);
        tasks.splice(newIndex, 0, removed);
        set({ tasks });
      },
      setFilter: filter => set({ filter }),
      setSortOption: (sortOption: SortOption) => set({ sortOption }),
      clearCompleted: () => {
        set(state => ({ tasks: state.tasks.filter(task => !task.completed) }));
      },
      setLoading: isLoading => set({ isLoading }),
      setError: error => set({ error }),
      getActiveTasksCount: () => {
        const state = get();
        return state.tasks.filter((task) => !task.completed).length;
      },
      getCompletedTasksCount: () => {
        const state = get();
        return state.tasks.filter((task) => task.completed).length;
      },
    }),
    {
      name: 'todo-storage',
      partialize: state => ({ tasks: state.tasks, filter: state.filter, sortOption: state.sortOption }),
    }
  )
); 