import React from 'react';
import { useFilteredTasks } from '@/store/selectors';
import { TaskItem } from '@/components';

const TaskList: React.FC = () => {
  const tasks = useFilteredTasks();

  if (tasks.length === 0) {
    return <div>No tasks found.</div>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList; 