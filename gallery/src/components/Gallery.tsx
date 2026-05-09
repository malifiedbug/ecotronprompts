import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Prompt } from '../types';
import { Banner728x90, Banner300x250, NativeBanner, triggerPopunder } from '../Ads';

const Gallery: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/prompts.json')
      .then(res => res.json())
      .then(data => {
        setPrompts(data);
        setFilteredPrompts(data);
      })
      .catch(err => console.error('Error loading prompts:', err));
  }, []);

  useEffect(() => {
    let result = prompts;
    if (search) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.prompt.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    setFilteredPrompts(result);
  }, [search, activeCategory, prompts]);

  const categories = ['All', ...Array.from(new Set(prompts.map(p => p.category)))];

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    triggerPopunder();
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="gallery-page">
      <header>
        <Link to="/" className="logo">Ecotron Prompts</Link>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search premium prompts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="/admin" className="filter-btn" style={{ fontSize: '0.8rem', opacity: 0.5 }}>Admin Login</Link>
      </header>

      <section className="hero">
        <h1 style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Ecotron Prompts</h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>The world's most advanced AI prompt library. Exclusive, curated, and high-performance.</p>
        
        <div className="filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <Banner728x90 />

      <main className="masonry-grid">
        <NativeBanner />
        <NativeBanner />
        {filteredPrompts.map((prompt, index) => (
          <React.Fragment key={prompt.id}>
            {/* Multiply Ads: Inject ads every 5 items */}
            {index % 5 === 0 && index !== 0 && (
              <div style={{ breakInside: 'avoid', marginBottom: '2rem' }}>
                <Banner300x250 />
                <NativeBanner />
              </div>
            )}
            
            <Link to={`/prompt/${prompt.id}`} className="prompt-card" style={{ animationDelay: `${index * 0.05}s` }}>
              {prompt.featured && <div className="featured-badge">FEATURED</div>}
              {prompt.images[0] && (
                <img src={prompt.images[0]} alt={prompt.title} className="card-image" />
              )}
              <div className="card-content">
                <div className="card-category">{prompt.category}</div>
                <h3 className="card-title">{prompt.title}</h3>
                <p className="card-desc">{prompt.description}</p>
                
                <div className="card-footer">
                  <div className="author">
                    <span>by</span>
                    <span className="author-link">{prompt.author}</span>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="action-btn"
                      onClick={(e) => handleCopy(e, prompt.prompt)}
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </React.Fragment>
        ))}
        {/* Fill more ads at the end */}
        <NativeBanner /><NativeBanner /><NativeBanner /><NativeBanner />
        <Banner300x250 /><Banner300x250 />
      </main>
    </div>
  );
};

export default Gallery;
