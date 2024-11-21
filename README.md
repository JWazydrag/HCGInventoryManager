# HCG Inventory Manager

A React Native mobile application for inventory management, built with Expo. This application provides a comprehensive solution for managing purchase orders, inventory tracking, and warehouse operations.

## Features

-   📦 Purchase Order Management
-   🔄 Real-time Sync with Backend Systems
-   📱 Cross-platform Support (iOS, Android, Web)
-   🌐 Offline Capabilities
-   🔐 Secure Authentication
-   📊 Inventory Tracking
-   🏭 Multiple Warehouse Support (EWM, WM, IM)

## Tech Stack

-   React Native
-   Expo
-   TypeScript
-   React Navigation
-   Expo Vector Icons
-   AsyncStorage
-   React Native Gesture Handler
-   Custom UI Components

## Prerequisites

Before you begin, ensure you have installed:

-   Node.js (v14 or higher)
-   npm or yarn
-   Expo CLI (`npm install -g expo-cli`)
-   iOS Simulator (for Mac users) or Android Studio (for Android development)

## Getting Started

1. Clone the repository:
2. Install dependencies:bash
   npm install
   or
   yarn install

3. Configure Environment Variables:
   Create a `.env` file in the root directory with the required environment variables:
   bash
   SERVICE_HOST=your_service_host
   SERVICE_URL=your_service_url
4. Start the development server:
   bash
   npm start
   or
   yarn start
5. Run on your preferred platform:
   bash
   iOS
   npm run ios
   Android
   npm run android
   Web
   npm run web
   Ask
   Copy
   Apply

## Project Structure

app/
├── components/ # Reusable UI components
│ ├── app-bootstrap/ # Application initialization
│ ├── background/ # Background components
│ ├── bottom-drawer/ # Bottom navigation drawer
│ ├── header/ # App header
│ └── navigation-tile/# Navigation components
├── config/ # Configuration files
├── contexts/ # React Context providers
├── screens/ # Application screens
│ ├── ewm/ # EWM module screens
│ ├── home/ # Home screen
│ ├── im/ # IM module screens
│ ├── login/ # Authentication screens
│ ├── po-details/ # Purchase Order details
│ ├── po-receiving/ # PO receiving screens
│ └── wm/ # WM module screens
├── types/ # TypeScript type definitions
└── utils/ # Utility functions and constants

## Core Features

### Authentication

-   Secure token-based authentication
-   Persistent login state
-   Protected routes for authenticated users

### Navigation

-   Stack-based navigation using React Navigation
-   Custom navigation tiles for module access
-   Bottom drawer for additional options

### Purchase Order Management

-   PO receiving functionality
-   Detailed PO view
-   Real-time sync with backend systems

### Warehouse Operations

-   Support for multiple warehouse types (EWM, WM, IM)
-   Storage location management
-   Inventory tracking

### UI/UX

-   Custom reusable components
-   Responsive layouts
-   Platform-specific styling
-   Toast notifications
-   Network status indicator

## Development Guidelines

### Code Style

The project uses ESLint and Prettier for code formatting. Configuration can be found in:

-   `.prettierrc`
-   `.prettierignore`
-   `tsconfig.json`

### Type Safety

-   Strict TypeScript configuration
-   Comprehensive type definitions in `app/types`
-   Type-safe navigation using React Navigation

### Best Practices

1. Follow the established component structure
2. Implement proper error handling
3. Use TypeScript for all new files
4. Maintain consistent styling patterns
5. Use contexts for global state management
6. Add appropriate documentation

## Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm start`       | Start the Expo development server |
| `npm run android` | Run on Android device/emulator    |
| `npm run ios`     | Run on iOS simulator              |
| `npm run web`     | Run in web browser                |

## Support

For support, please open an issue in the repository or contact the development team.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
