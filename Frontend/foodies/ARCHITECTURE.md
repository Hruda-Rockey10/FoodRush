# Food Delivery App - MVC Architecture with SOLID Principles

## Overview

This document outlines the refactored architecture of the Food Delivery application, implementing MVC design pattern and SOLID principles for better maintainability, scalability, and code organization.

## Architecture Layers

### 1. Service Layer (`src/service/`)

**Responsibility**: Handle all API communications and data fetching
**SOLID Principles Applied**:

- **Single Responsibility**: Each service handles one domain (auth, food, cart, order)
- **Open/Closed**: Services are open for extension but closed for modification
- **Dependency Inversion**: Services depend on abstractions, not concrete implementations

#### Services:

- `authService.js` - Authentication operations (login, register, logout, token validation)
- `foodService.js` - Food-related operations (fetch list, details, search, categories)
- `cartService.js` - Cart operations (add, remove, update, clear)
- `orderService.js` - Order operations (create, verify payment, fetch orders, delete)

#### Key Features:

- Consistent error handling with standardized response format
- Singleton pattern for service instances
- JSDoc documentation for all methods
- Type-safe parameter validation

### 2. Controller Layer (`src/controllers/`)

**Responsibility**: Handle business logic and coordinate between services and UI
**SOLID Principles Applied**:

- **Single Responsibility**: Each controller handles one domain's business logic
- **Open/Closed**: Controllers can be extended without modification
- **Interface Segregation**: Controllers provide specific interfaces for UI components

#### Controllers:

- `authController.js` - Authentication business logic and user feedback
- `foodController.js` - Food business logic, filtering, and sorting
- `cartController.js` - Cart business logic, validation, and calculations
- `orderController.js` - Order processing, payment flow, and status management

#### Key Features:

- Business logic separation from UI components
- Consistent success/error callback patterns
- Toast notifications for user feedback
- Data transformation and validation

### 3. View Layer (UI Components)

**Responsibility**: Present data and handle user interactions
**SOLID Principles Applied**:

- **Single Responsibility**: Each component has one clear purpose
- **Dependency Inversion**: Components depend on controllers, not services directly

#### Updated Components:

- `YetiLogin.jsx` - Uses `authController` for login operations
- `YetiRegister.jsx` - Uses `authController` for registration
- `FoodDetails.jsx` - Uses `foodController` with loading states
- `MyOrders.jsx` - Uses `orderController` with error handling
- `PlaceOrder.jsx` - Uses `orderController` for complete order flow
- `StoreContext.jsx` - Updated to use controllers instead of direct service calls

### 4. Custom Hooks (`src/hooks/`)

**Responsibility**: Reusable state management and side effects
**SOLID Principles Applied**:

- **Single Responsibility**: Each hook handles one specific concern

#### Hooks:

- `useLoading.js` - Manages loading states and error handling

### 5. Reusable Components (`src/components/`)

**Responsibility**: Shared UI components following DRY principles
**SOLID Principles Applied**:

- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Components are open for extension through props

#### Components:

- `LoadingSpinner.jsx` - Reusable loading indicator with multiple variants

## Data Flow

```
UI Component → Controller → Service → API
     ↑            ↓
   Loading    Business Logic
   States     & Validation
```

### Example Flow (Adding Item to Cart):

1. **UI Component** (`FoodItem.jsx`) calls `increaseQty(foodId)`
2. **StoreContext** calls `cartController.addToCart(foodId, token, onSuccess, onError)`
3. **Controller** validates input and calls `cartService.addToCart(foodId, token)`
4. **Service** makes API call and returns standardized response
5. **Controller** handles response, shows toast notification, calls callbacks
6. **UI Component** updates state based on success/error callbacks

## Error Handling Strategy

### Service Layer:

- All services return consistent response format:
  ```javascript
  {
    success: boolean,
    data?: any,
    error?: {
      message: string,
      status: number,
      details?: any
    }
  }
  ```

### Controller Layer:

- Controllers handle business logic errors
- Show appropriate toast notifications
- Call success/error callbacks for UI updates

### UI Layer:

- Components use loading states and error boundaries
- Graceful error display with retry options
- Loading spinners for better UX

## Benefits of This Architecture

### 1. Maintainability

- Clear separation of concerns
- Easy to locate and fix bugs
- Consistent code patterns

### 2. Testability

- Each layer can be tested independently
- Mock services for controller testing
- Isolated component testing

### 3. Scalability

- Easy to add new features
- Services can be extended without affecting other layers
- Controllers can be enhanced with new business logic

### 4. Reusability

- Services can be reused across different controllers
- Controllers can be reused across different UI components
- Custom hooks provide reusable state management

### 5. SOLID Principles Compliance

- **S**: Each class/function has one reason to change
- **O**: Open for extension, closed for modification
- **L**: Subclasses are substitutable for base classes
- **I**: Clients depend only on interfaces they use
- **D**: Depend on abstractions, not concretions

## File Structure

```
src/
├── service/           # API communication layer
│   ├── authService.js
│   ├── foodService.js
│   ├── cartService.js
│   └── orderService.js
├── controllers/       # Business logic layer
│   ├── authController.js
│   ├── foodController.js
│   ├── cartController.js
│   └── orderController.js
├── hooks/            # Custom React hooks
│   └── useLoading.js
├── components/       # UI components
│   ├── LoadingSpinner/
│   ├── context/
│   └── ...
└── pages/           # Page components
    ├── FoodDetails/
    ├── MyOrders/
    └── ...
```

## Migration Notes

### Before (Direct Service Usage):

```javascript
// Component directly calling service
const response = await login(data);
if (response.status === 200) {
  // Handle success
}
```

### After (Controller Pattern):

```javascript
// Component using controller
const onSuccess = (data) => {
  /* handle success */
};
const onError = (error) => {
  /* handle error */
};
await authController.login(data, onSuccess, onError);
```

## Future Enhancements

1. **State Management**: Consider Redux or Zustand for complex state
2. **Caching**: Implement service-level caching for better performance
3. **Offline Support**: Add service workers for offline functionality
4. **Type Safety**: Migrate to TypeScript for better type safety
5. **Testing**: Add comprehensive unit and integration tests
6. **API Versioning**: Implement API versioning strategy
7. **Monitoring**: Add error tracking and performance monitoring

## Conclusion

This architecture provides a solid foundation for the Food Delivery application, ensuring:

- Clean separation of concerns
- Easy maintenance and testing
- Scalable and extensible codebase
- Consistent error handling and user experience
- Compliance with SOLID principles and MVC pattern
