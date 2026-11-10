import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement && rootElement.getAttribute('data-prerendered') === 'true') {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    {
      onRecoverableError(error, errorInfo) {
        console.error('[HYDRATION_RECOVERABLE_ERROR]', error);
        if (errorInfo?.componentStack) {
          console.error('[HYDRATION_COMPONENT_STACK]', errorInfo.componentStack);
        }
      },
    },
  );
} else if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
