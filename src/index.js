// Entry point for the application, responsible for mounting React components to the DOM.

// Import the React library
import React from 'react';

// Import ReactDOM for rendering components
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App/App';

// Initialize the root of the React app using ReactDOM.createRoot()
const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root container for the application

// Render the App component inside the root, wrapped with React.StrictMode for better debugging and warnings
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
