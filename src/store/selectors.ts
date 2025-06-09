import { useTaskStore } from './taskStore';
import { Task } from '@/types/task';

export const useFilteredTasks = (): Task[] => {
  const tasks = useTaskStore(state => state.tasks);
  const filter = useTaskStore(state => state.filter);
  if (filter === 'active') return tasks.filter(t => !t.completed);
  if (filter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
};

export const useTaskCounts = () => {
  const tasks = useTaskStore(state => state.tasks);
  return {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };
};

export const useTaskStats = () => {
  const { total, active, completed } = useTaskCounts();
  return {
    total,
    active,
    completed,
    percentCompleted: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}; 