import React from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { useTaskStore } from '@/store/taskStore';
import { SortOption } from '@/types/task';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'alpha-asc', label: 'A to Z' },
  { value: 'alpha-desc', label: 'Z to A' },
  { value: 'completed', label: 'Completed Last' },
];

const TaskSort: React.FC = () => {
  const { sortOption, setSortOption } = useTaskStore();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const currentIndex = sortOptions.findIndex(option => option.value === sortOption);
      let newIndex = currentIndex;

      if (e.key === 'ArrowUp') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : sortOptions.length - 1;
      } else {
        newIndex = currentIndex < sortOptions.length - 1 ? currentIndex + 1 : 0;
      }

      setSortOption(sortOptions[newIndex].value);
    }
  };

  return (
    <FormControl>
      <FormLabel 
        fontSize="sm" 
        fontWeight="medium" 
        mb={2}
        htmlFor="task-sort"
      >
        Sort Tasks
      </FormLabel>
      <Tooltip label="Choose how to sort your tasks">
        <Select
          id="task-sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          onKeyDown={handleKeyDown}
          size="md"
          bg={bgColor}
          borderColor={borderColor}
          _hover={{ borderColor: 'blue.400' }}
          _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)' }}
          aria-label="Sort tasks by"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Tooltip>
    </FormControl>
  );
};

export default TaskSort; 