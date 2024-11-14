import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client in React 18
import App from './App';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Create a root for React 18

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
