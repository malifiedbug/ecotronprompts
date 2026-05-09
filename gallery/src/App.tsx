import React, { useState, useEffect } from 'react';
import './index.css';
import { Banner728x90, Banner300x250, Banner160x600, Banner320x50, NativeBanner, triggerPopunder } from './Ads';

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  images: string[];
  author: string;
  authorLink: string;
  source: string;
  published: string;
  languages: string[];
  featured: boolean;
  category: string;
}

const App: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    description: '',
    prompt: '',
    category: 'General',
    author: 'Admin',
    imageUrl: ''
  });

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerPopunder();
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="app-container">
      <div className="hero-bg"></div>
      <div className="hero-gradient"></div>

      <header>
        <div className="logo">Ecotron Prompts</div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search prompts, styles, keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="filter-btn active" onClick={() => setIsAddModalOpen(true)}>
          + Add Prompt
        </button>
      </header>

      <section className="hero">
        <h1>Premium AI Prompt Gallery</h1>
        <p>A curated collection of professional-grade prompts for Google's Nano Banana Pro. Elevate your creative workflow with stunning AI-generated visuals.</p>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value">{prompts.length}</div>
            <div className="stat-label">Total Prompts</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{prompts.filter(p => p.featured).length}</div>
            <div className="stat-label">Featured</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{categories.length - 1}</div>
            <div className="stat-label">Categories</div>
          </div>
        </div>

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

      <div className="ad-wrapper">
        <Banner728x90 />
      </div>

      <main className="masonry-grid">
        <NativeBanner />
        {filteredPrompts.map((prompt, index) => (
          <React.Fragment key={prompt.id}>
            {index === 6 && <Banner300x250 />}
            <div 
            key={prompt.id} 
            className="prompt-card" 
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedPrompt(prompt)}
          >
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
                  <a 
                    href={prompt.authorLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="author-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {prompt.author}
                  </a>
                </div>
                <div className="card-actions">
                  <button 
                    className="action-btn"
                    title="Copy Prompt"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(prompt.prompt);
                    }}
                  >
                    📋
                  </button>
                  <button className="action-btn" title="View Details">
                    ✨
                  </button>
                </div>
              </div>
            </div>
            </div>
          </React.Fragment>
        ))}
      </main>

      {selectedPrompt && (
        <div className="modal-overlay" onClick={() => setSelectedPrompt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPrompt(null)}>✕</button>
            <div className="modal-body">
              <div className="modal-image-container">
                {selectedPrompt.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="modal-image" />
                ))}
              </div>
              <div className="modal-info">
                <div className="card-category">{selectedPrompt.category}</div>
                <h2 className="card-title" style={{ fontSize: '2rem' }}>{selectedPrompt.title}</h2>
                <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>{selectedPrompt.description}</p>
                
                <div className="modal-prompt-box">
                  <button className="copy-btn" onClick={() => handleCopy(selectedPrompt.prompt)}>Copy</button>
                  {selectedPrompt.prompt}
                </div>

                <div className="card-footer">
                  <div className="author" style={{ fontSize: '1rem' }}>
                    <span>Curated by</span>
                    <a href={selectedPrompt.authorLink} target="_blank" rel="noopener noreferrer" className="author-link">
                      {selectedPrompt.author}
                    </a>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Published on {selectedPrompt.published} • Source: <a href={selectedPrompt.source} style={{ color: 'var(--secondary)' }}>Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>✕</button>
            <div className="modal-body" style={{ display: 'block', padding: '2.5rem' }}>
              <h2 className="card-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Add New Prompt</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input 
                  type="text" 
                  className="search-bar-input" 
                  placeholder="Prompt Title"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: 'white' }}
                  onChange={(e) => setNewPrompt({...newPrompt, title: e.target.value})}
                />
                <select 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: 'white' }}
                  onChange={(e) => setNewPrompt({...newPrompt, category: e.target.value})}
                >
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  <option value="New Category">+ New Category</option>
                </select>
                <textarea 
                  placeholder="Description"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: 'white', minHeight: '100px' }}
                  onChange={(e) => setNewPrompt({...newPrompt, description: e.target.value})}
                ></textarea>
                <textarea 
                  placeholder="AI Prompt Text"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: 'white', minHeight: '150px', fontFamily: 'monospace' }}
                  onChange={(e) => setNewPrompt({...newPrompt, prompt: e.target.value})}
                ></textarea>
                <input 
                  type="text" 
                  placeholder="Image URL (Direct link to jpg/png)"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', color: 'white' }}
                  onChange={(e) => setNewPrompt({...newPrompt, imageUrl: e.target.value})}
                />
                {newPrompt.imageUrl && (
                  <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                    <img 
                      src={newPrompt.imageUrl} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)' }} 
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
                <button 
                  className="filter-btn active" 
                  style={{ width: '100%', padding: '1rem' }}
                  onClick={() => {
                    console.log('Saving to CMS/JSON:', newPrompt);
                    alert('Prompt metadata generated! In a production environment, this would sync to Payload CMS or update the local JSON database.');
                    setIsAddModalOpen(false);
                  }}
                >
                  Save Prompt to Library
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Banner160x600 />
      <Banner320x50 />
    </div>
  );
};

export default App;
