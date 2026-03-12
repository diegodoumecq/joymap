import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './globals.css';

import { Main } from './pages/Main';

const element = document.createElement('div');
document.body.appendChild(element);

const root = createRoot(element);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/joymap/examples/:page" element={<Main />} />
      <Route path="/" element={<Navigate to="/joymap/examples/readme" replace />} />
      <Route path="/joymap" element={<Navigate to="/joymap/examples/readme" replace />} />
    </Routes>
  </BrowserRouter>,
);
