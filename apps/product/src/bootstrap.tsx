// Import CSS synchronously to avoid TypeScript issues
import './index.css';

import('./App').then(({ default: App }) => {
  import('react').then(({ default: React }) => {
    import('react-dom/client').then(({ createRoot }) => {
      const container = document.getElementById('root');
      if (container) {
        const root = createRoot(container);
        root.render(React.createElement(App));
      }
    });
  });
}).catch(err => {
  console.error('Error loading app:', err);
}); 