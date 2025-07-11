# Micro-Frontend Base Architecture

A modern micro-frontend architecture built with Webpack 5 Module Federation, React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation
```bash
pnpm install
```

### Development
Start all micro-frontends simultaneously:
```bash
npm run dev
```

This will start all apps on their respective ports:
- Shell: http://localhost:3000
- Admin: http://localhost:3001
- Auth: http://localhost:3002
- Cart: http://localhost:3003
- Dashboard: http://localhost:3004
- Product: http://localhost:3005

### Individual App Development
```bash
# Start shell app only
cd apps/shell && npm run dev

# Start product app only
cd apps/product && npm run dev
```

## 🏗️ Architecture

### Apps
- **Shell**: Main application shell with routing and navigation
- **Admin**: Administrative interface
- **Auth**: Authentication and user management
- **Cart**: Shopping cart functionality
- **Dashboard**: Analytics and reporting
- **Product**: Product catalog and management

### Shared
- **UI**: Reusable UI components
- **State**: Shared state management (Zustand)
- **Types**: Common TypeScript types

## 🔧 Recent Fixes

### Module Federation Configuration
Fixed the "Shared module is not available for eager consumption" error by:

1. **Updated Webpack Configuration**: Modified `config/webpack.base.js` to properly handle shared dependencies:
   - Set `eager: true` for React, React-DOM, React Router, and Zustand
   - Added proper singleton configuration
   - Added CORS headers for development

2. **Async Bootstrap Pattern**: Updated all app bootstrap files to use async loading:
   - Prevents eager consumption errors
   - Better error handling for missing remotes
   - Compatible with Module Federation

3. **Defensive Remote Loading**: Enhanced shell app to handle missing remote modules gracefully

### Key Changes Made:
- `config/webpack.base.js`: Updated shared dependencies configuration
- `apps/*/src/bootstrap.tsx`: Implemented async loading pattern
- `apps/shell/src/App.tsx`: Added error boundaries for remote components
- `config/tsconfig.base.json`: Enhanced TypeScript configuration

## 🛠️ Build & Deploy

### Build
```bash
npm run build
```

### Docker
```bash
npm run docker:build
npm run docker:up
```

## 📚 Documentation

- [Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [Storybook](https://storybook.js.org/) (for UI components)

## 🐛 Troubleshooting

### Common Issues

1. **Module Federation Errors**: Ensure all apps are running before accessing the shell
2. **Port Conflicts**: Check that ports 3000-3005 are available
3. **CORS Issues**: Development server includes CORS headers, but check browser console for errors

### Development Tips
- Start with the shell app first: `cd apps/shell && npm run dev`
- Check browser console for Module Federation loading status
- Use browser dev tools to inspect network requests for remote modules