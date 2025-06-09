import React, { useState } from 'react';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleToggle = () => toggleTask(task.id);
  const handleDelete = () => deleteTask(task.id);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    updateTask(task.id, { title });
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />
      {isEditing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem; 