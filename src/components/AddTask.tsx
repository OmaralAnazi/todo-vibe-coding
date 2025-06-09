import React, { useState } from 'react';
import { useTaskStore } from '@/store/taskStore';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTask = useTaskStore(state => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask; 