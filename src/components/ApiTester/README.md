# ApiTester Component - Refactored Architecture

## Overview

The ApiTester component has been refactored to follow a modular, maintainable architecture with clear separation of concerns.

## Structure

```
src/components/ApiTester/
├── index.tsx              # Main container with context provider
├── ApiTester.tsx          # Main layout component
├── context/
│   └── ApiContext.tsx     # Context for state management
├── constants.ts           # Shared constants and configurations
├── FlowSelector.tsx       # Sidebar flow selection
├── ApiDocumentation.tsx   # API information display
├── EndpointHeader.tsx     # Endpoint details header
├── TabNavigation.tsx      # Tab switching component
├── TryItOutTab.tsx        # API testing interface
├── ResponseTab.tsx        # Response display container
├── ResponseViewer.tsx     # JSON response viewer
├── DataTable.tsx          # Data table with pagination
└── README.md             # This documentation
```

## Key Improvements

### 1. Separation of Concerns
- Each component has a single responsibility
- Logic is separated from presentation
- Reusable components and hooks

### 2. State Management
- Context API for global state
- Custom hooks for specific functionality
- Centralized state management

### 3. Code Reusability
- Shared constants and types
- Utility functions for formatting and validation
- Custom hooks for common patterns

### 4. Type Safety
- Shared TypeScript interfaces
- Strict typing throughout
- Better IntelliSense support

## Components

### ApiTester (Main Layout)
- Coordinates the overall layout
- Manages component composition
- Handles responsive design

### FlowSelector
- Displays available API flows
- Handles flow selection
- Shows flow descriptions and categories

### TryItOutTab
- Parameter configuration
- API execution
- Request URL display

### ResponseTab
- Response display coordination
- Error handling
- Loading states

### DataTable
- Paginated data display
- Formatting utilities
- Navigation controls

## Hooks

### useApiState
- Manages API call state
- Handles loading, error, and response states
- Provides execution methods

### usePagination
- Handles pagination logic
- Provides navigation methods
- Manages page state

## Utilities

### formatters.ts
- `formatValue()` - Number formatting
- `formatDate()` - Date formatting

### validators.ts
- `isColcapFlow()` - Flow validation
- `isValidFlow()` - Flow type checking
- `isValidStartPeriod()` - Period validation

## Benefits

1. **Maintainability**: Each component is focused and testable
2. **Reusability**: Hooks and utilities can be reused
3. **Performance**: Better memoization opportunities
4. **Developer Experience**: Better TypeScript support and IntelliSense
5. **Testing**: Easier to test individual components
6. **Scalability**: Easy to add new features or modify existing ones

## Usage

```tsx
import ApiTesterContainer from "@/components/ApiTester";

export default function Home() {
  return <ApiTesterContainer />;
}
```

The component automatically handles all state management and provides a complete API testing interface. 