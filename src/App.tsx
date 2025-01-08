import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SupabaseProvider } from './contexts/SupabaseContext';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AdminDashboard from './pages/AdminDashboard';
import Challenges from './pages/Challenges';

function App() {
  return (
    <SupabaseProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/challenges" element={<Challenges />} />
        </Routes>
      </BrowserRouter>
    </SupabaseProvider>
  );
}

export default App;