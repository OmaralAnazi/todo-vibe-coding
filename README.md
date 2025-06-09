# TODO App

A modern, feature-rich TODO application built with React, TypeScript, and Chakra UI.

## Features

- Create, read, update, and delete tasks
- Drag and drop task reordering
- Task filtering and sorting
- Dark/light mode support
- Responsive design
- Local storage persistence
- Keyboard navigation
- Screen reader support

## Tech Stack

- React 18
- TypeScript
- Vite
- Chakra UI
- Zustand (State Management)
- ESLint + Prettier
- React Beautiful DnD

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── store/         # Zustand store
├── types/         # TypeScript types
├── utils/         # Utility functions
├── constants/     # Constants and configuration
├── theme/         # Chakra UI theme
└── assets/        # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
