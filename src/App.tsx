import { Box, Container, Heading, VStack, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import { AddTask, TaskList, TaskFilters, TaskSort } from '@/components';
import theme from '@/theme';

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={bgColor} py={8} display="flex" justifyContent="center" alignItems="center" mx="auto" w="100vw">
        <Container maxW="container.md" px={4}>
          <VStack spacing={8} align="stretch" width="100%">
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Task Manager
            </Heading>

            <Box
              bg={cardBg}
              p={8}
              borderRadius="2xl"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
              width="100%"
            >
              <AddTask />
            </Box>

            <Box
              bg={cardBg}
              p={8}
              borderRadius="2xl"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
              width="100%"
            >
              <VStack spacing={6} align="stretch">
                <TaskFilters />
                <TaskSort />
                <TaskList />
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
