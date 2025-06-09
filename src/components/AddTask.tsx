import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  VStack,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useTaskStore } from '@/store/taskStore';

const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTaskStore();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const inputHoverBorder = useColorModeValue('blue.400', 'blue.300');
  const inputFocusBorder = useColorModeValue('blue.500', 'blue.400');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title cannot be empty');
      inputRef.current?.focus();
      return;
    }

    if (trimmedTitle.length > 100) {
      setError('Task title cannot be longer than 100 characters');
      inputRef.current?.focus();
      return;
    }

    addTask(trimmedTitle);
    setTitle('');
    setError('');
    inputRef.current?.focus();
    
    toast({
      title: 'Task added successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} role="form" aria-label="Add new task">
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!error}>
          <InputGroup size="lg">
            <Input
              ref={inputRef}
              value={title}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              bg={inputBg}
              borderColor={inputBorder}
              _hover={{ borderColor: inputHoverBorder }}
              _focus={{ borderColor: inputFocusBorder }}
              aria-label="New task title"
              aria-invalid={!!error}
              aria-describedby={error ? 'task-error' : undefined}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                type="submit"
                colorScheme="blue"
                aria-label="Add task"
              >
                <AddIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          {error && (
            <FormErrorMessage id="task-error" role="alert">
              {error}
            </FormErrorMessage>
          )}
        </FormControl>
      </VStack>
    </Box>
  );
};

export default AddTask; 