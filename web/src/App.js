import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.js';
import Home from './pages/home';
import WebTeam from './pages/webteam.js';
import Footer from './components/Footer';
import EventsPage from './pages/events';
import RegisterPage from './pages/registerpage';
import './style.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/webteam" element={<WebTeam />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/register/:slug" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;