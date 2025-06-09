import React from 'react';
import { Box, VStack, Text, useColorModeValue, Spinner, Skeleton } from '@chakra-ui/react';
import { useTaskStore } from '@/store/taskStore';
import { TaskItem } from '@/components';

const TaskList: React.FC = () => {
  const { tasks, filter, sortOption, isLoading } = useTaskStore();
  const bgColor = useColorModeValue('white', 'gray.700');

  if (isLoading) {
    return (
      <Box p={8} bg={bgColor} borderRadius="xl" textAlign="center" boxShadow="sm">
        <Spinner size="xl" thickness="4px" color="blue.400" mb={4} />
        <VStack spacing={4} align="stretch">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="60px" borderRadius="xl" />
          ))}
        </VStack>
      </Box>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'alpha-asc':
        return a.title.localeCompare(b.title);
      case 'alpha-desc':
        return b.title.localeCompare(a.title);
      case 'completed':
        return a.completed === b.completed
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : a.completed ? 1 : -1;
      default:
        return 0;
    }
  });

  if (sortedTasks.length === 0) {
    return (
      <Box p={8} bg={bgColor} borderRadius="xl" textAlign="center" boxShadow="sm">
        <Text fontSize="xl" color="gray.500">No tasks found</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch">
      {sortedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </VStack>
  );
};

export default TaskList; 