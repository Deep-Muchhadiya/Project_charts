import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (typeof document !== 'undefined') {
  const container = document.getElementById('root');

  if (container) {
    const root = ReactDOM.createRoot(container as HTMLElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}