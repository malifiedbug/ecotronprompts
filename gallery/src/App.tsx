import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Gallery from './components/Gallery';
import PromptDetail from './components/PromptDetail';
import Admin from './components/Admin';
import { Banner320x50, Banner160x600 } from './Ads';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="hero-bg"></div>
        <div className="hero-gradient"></div>

        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Banner160x600 />
        <Banner320x50 />
      </div>
    </Router>
  );
};

export default App;
