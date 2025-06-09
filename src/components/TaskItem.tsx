import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Text,
  IconButton,
  HStack,
  useColorModeValue,
  Input,
  useToast,
  Tooltip,
  ScaleFade,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  EditIcon,
  CheckIcon,
  CloseIcon,
  DragHandleIcon,
} from '@chakra-ui/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import { useTaskStore } from '@/store/taskStore';

interface TaskItemProps {
  task: Task;
}

const strikethrough = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isFading, setIsFading] = useState(false);
  const { toggleTask, deleteTask, updateTask } = useTaskStore();
  const toast = useToast();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : isFading ? 0 : 1,
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBgColor = useColorModeValue('gray.50', 'gray.600');
  const completedTextColor = useColorModeValue('gray.500', 'gray.400');

  const handleToggle = () => {
    toggleTask(task.id);
    toast({
      title: task.completed ? 'Task marked as incomplete' : 'Task completed!',
      status: task.completed ? 'info' : 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleDelete = () => {
    setIsFading(true);
    setTimeout(() => {
      deleteTask(task.id);
      toast({
        title: 'Task deleted',
        status: 'info',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }, 300);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateTask(task.id, { ...task, title: editedTitle.trim() });
      setIsEditing(false);
      toast({
        title: 'Task updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <ScaleFade in={!isFading} initialScale={0.9}>
      <Box
        ref={setNodeRef}
        style={style}
        p={6}
        bg={bgColor}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
        _hover={{ bg: hoverBgColor, shadow: 'md' }}
        transition="all 0.2s"
      >
        <HStack spacing={6} align="center">
          <Tooltip label="Drag to reorder">
            <IconButton
              aria-label="Drag task"
              icon={<DragHandleIcon boxSize={6} />}
              variant="ghost"
              size="lg"
              cursor="grab"
              opacity={0.5}
              _hover={{ opacity: 1 }}
              {...attributes}
              {...listeners}
            />
          </Tooltip>
          <Checkbox
            isChecked={task.completed}
            onChange={handleToggle}
            colorScheme="green"
            size="lg"
          />
          {isEditing ? (
            <>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                autoFocus
                size="lg"
                height="50px"
                fontSize="lg"
                variant="filled"
                flex={1}
              />
              <HStack spacing={3}>
                <Tooltip label="Save changes">
                  <IconButton
                    aria-label="Save task"
                    icon={<CheckIcon boxSize={5} />}
                    onClick={handleSave}
                    colorScheme="green"
                    size="lg"
                  />
                </Tooltip>
                <Tooltip label="Cancel editing">
                  <IconButton
                    aria-label="Cancel edit"
                    icon={<CloseIcon boxSize={5} />}
                    onClick={handleCancel}
                    colorScheme="red"
                    size="lg"
                  />
                </Tooltip>
              </HStack>
            </>
          ) : (
            <Text
              flex={1}
              textDecoration={task.completed ? 'line-through' : 'none'}
              color={task.completed ? completedTextColor : 'inherit'}
              fontSize="lg"
              fontWeight="medium"
              position="relative"
              _after={task.completed ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                width: '100%',
                height: '2px',
                bg: completedTextColor,
                animation: `${strikethrough} 0.3s ease-in`,
              } : {}}
              transition="color 0.2s"
            >
              {task.title}
            </Text>
          )}
          {!isEditing && (
            <HStack spacing={3}>
              <Tooltip label="Edit task">
                <IconButton
                  aria-label="Edit task"
                  icon={<EditIcon boxSize={5} />}
                  onClick={handleEdit}
                  size="lg"
                  variant="ghost"
                  opacity={0.5}
                  _hover={{ opacity: 1 }}
                />
              </Tooltip>
              <Tooltip label="Delete task">
                <IconButton
                  aria-label="Delete task"
                  icon={<DeleteIcon boxSize={5} />}
                  onClick={handleDelete}
                  colorScheme="red"
                  size="lg"
                  variant="ghost"
                  opacity={0.5}
                  _hover={{ opacity: 1 }}
                />
              </Tooltip>
            </HStack>
          )}
        </HStack>
      </Box>
    </ScaleFade>
  );
};

export default TaskItem; 