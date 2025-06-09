import React from 'react';
import {
  HStack,
  Button,
  Text,
  useColorModeValue,
  Tooltip,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/react';
import { useTaskStore } from '@/store/taskStore';

const TaskFilters: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null) as React.RefObject<any>;
  const toast = useToast();

  const {
    filter,
    setFilter,
    tasks,
    clearCompleted,
    getActiveTasksCount,
    getCompletedTasksCount,
  } = useTaskStore();

  const activeCount = getActiveTasksCount();
  const completedCount = getCompletedTasksCount();
  const totalCount = tasks.length;

  const buttonBg = useColorModeValue('gray.100', 'gray.700');
  const activeButtonBg = useColorModeValue('blue.500', 'blue.400');
  const activeButtonColor = useColorModeValue('white', 'gray.900');

  const handleClearCompleted = () => {
    clearCompleted();
    onClose();
    toast({
      title: 'Completed tasks cleared',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      <HStack
        spacing={4}
        justify="space-between"
        align="center"
        w="100%"
        p={4}
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="xl"
        boxShadow="sm"
        role="toolbar"
        aria-label="Task filters"
      >
        <Text 
          fontSize="lg" 
          fontWeight="medium"
          role="status"
          aria-label={`${activeCount} ${activeCount === 1 ? 'task' : 'tasks'} left`}
        >
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
        </Text>

        <HStack spacing={2} role="group" aria-label="Filter tasks">
          <Tooltip label="Show all tasks">
            <Button
              size="md"
              variant="ghost"
              bg={filter === 'all' ? activeButtonBg : buttonBg}
              color={filter === 'all' ? activeButtonColor : 'inherit'}
              _hover={{
                bg: filter === 'all' ? activeButtonBg : 'gray.200',
              }}
              onClick={() => setFilter('all')}
              onKeyDown={(e) => handleKeyDown(e, () => setFilter('all'))}
              aria-pressed={filter === 'all'}
              role="radio"
            >
              All
            </Button>
          </Tooltip>
          <Tooltip label="Show active tasks">
            <Button
              size="md"
              variant="ghost"
              bg={filter === 'active' ? activeButtonBg : buttonBg}
              color={filter === 'active' ? activeButtonColor : 'inherit'}
              _hover={{
                bg: filter === 'active' ? activeButtonBg : 'gray.200',
              }}
              onClick={() => setFilter('active')}
              onKeyDown={(e) => handleKeyDown(e, () => setFilter('active'))}
              aria-pressed={filter === 'active'}
              role="radio"
            >
              Active
            </Button>
          </Tooltip>
          <Tooltip label="Show completed tasks">
            <Button
              size="md"
              variant="ghost"
              bg={filter === 'completed' ? activeButtonBg : buttonBg}
              color={filter === 'completed' ? activeButtonColor : 'inherit'}
              _hover={{
                bg: filter === 'completed' ? activeButtonBg : 'gray.200',
              }}
              onClick={() => setFilter('completed')}
              onKeyDown={(e) => handleKeyDown(e, () => setFilter('completed'))}
              aria-pressed={filter === 'completed'}
              role="radio"
            >
              Completed
            </Button>
          </Tooltip>
        </HStack>

        {completedCount > 0 && (
          <Tooltip label="Clear completed tasks">
            <Button
              size="md"
              variant="ghost"
              colorScheme="red"
              onClick={onOpen}
              onKeyDown={(e) => handleKeyDown(e, onOpen)}
              aria-label="Clear completed tasks"
            >
              Clear completed
            </Button>
          </Tooltip>
        )}
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        aria-labelledby="clear-completed-title"
        aria-describedby="clear-completed-description"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader 
              fontSize="lg" 
              fontWeight="bold"
              id="clear-completed-title"
            >
              Clear Completed Tasks
            </AlertDialogHeader>

            <AlertDialogBody id="clear-completed-description">
              Are you sure you want to clear all completed tasks? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onClose}
                aria-label="Cancel clearing completed tasks"
              >
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={handleClearCompleted} 
                ml={3}
                aria-label="Confirm clearing completed tasks"
              >
                Clear
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TaskFilters; 