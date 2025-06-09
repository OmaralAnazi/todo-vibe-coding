import React from 'react';
import { ChakraProvider, Container, Heading, VStack } from '@chakra-ui/react';
import theme from '@/theme';
import { AddTask, TaskList } from '@/components';
import './App.css'

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="md" py={8}>
        <VStack spacing={6} align="stretch">
          <Heading as="h1" size="lg" textAlign="center">
            TODO App
          </Heading>
          <AddTask />
          <TaskList />
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default App;
