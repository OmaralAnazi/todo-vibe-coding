import React, { useState } from 'react';
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

  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const inputHoverBorder = useColorModeValue('blue.400', 'blue.300');
  const inputFocusBorder = useColorModeValue('blue.500', 'blue.400');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title cannot be empty');
      return;
    }

    if (trimmedTitle.length > 100) {
      setError('Task title cannot be longer than 100 characters');
      return;
    }

    addTask(trimmedTitle);
    setTitle('');
    setError('');
    
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

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={!!error}>
          <Text mb={2} fontSize="lg" fontWeight="medium">
            Enter your task details
          </Text>
          <InputGroup size="lg">
            <Input
              value={title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              size="lg"
              height="60px"
              fontSize="lg"
              autoFocus
              bg={inputBg}
              borderColor={inputBorder}
              _hover={{ borderColor: inputHoverBorder }}
              _focus={{ borderColor: inputFocusBorder, boxShadow: 'none' }}
              pr="5rem"
            />
            <InputRightElement width="5rem" h="100%">
              <Button
                h="100%"
                size="lg"
                colorScheme="blue"
                type="submit"
                isDisabled={!title.trim()}
                leftIcon={<AddIcon boxSize={5} />}
                fontSize="lg"
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
              >
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage fontSize="md">{error}</FormErrorMessage>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default AddTask; 