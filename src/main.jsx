import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';
import './styles/overlays.css';
import './styles/menu.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/arcade.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
