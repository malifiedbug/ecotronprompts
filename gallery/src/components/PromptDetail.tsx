import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Prompt } from '../types';
import { Banner728x90, Banner300x250, Banner160x300, Banner468x60, triggerPopunder } from '../Ads';

const PromptDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prompt, setPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    fetch('/prompts.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Prompt) => p.id === id);
        setPrompt(found);
      });
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerPopunder();
    alert('Prompt copied to clipboard!');
  };

  if (!prompt) return <div className="loading">Loading...</div>;

  return (
    <div className="detail-container" style={{ padding: '8rem 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" className="filter-btn" style={{ marginBottom: '2rem', display: 'inline-block' }}>← Back to Gallery</Link>
      
      <div className="detail-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>{prompt.title}</h1>
        <div className="card-category">{prompt.category}</div>
      </div>

      <Banner728x90 />
      <Banner468x60 />

      <div className="detail-content" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
        <div className="detail-main">
          <div className="modal-image-container" style={{ marginBottom: '2rem' }}>
            {prompt.images.map((img, idx) => (
              <img key={idx} src={img} alt={prompt.title} className="modal-image" style={{ marginBottom: '1.5rem' }} />
            ))}
          </div>

          <div className="detail-info-box" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <h2 className="card-title">Prompt Details</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem' }}>{prompt.description}</p>
            
            <h3 className="card-category">Copy Prompt</h3>
            <div className="modal-prompt-box" style={{ margin: '1rem 0 2rem' }}>
              <button className="copy-btn" onClick={() => handleCopy(prompt.prompt)}>Copy</button>
              {prompt.prompt}
            </div>

            <div className="detail-meta" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              <div>Author: <a href={prompt.authorLink} className="author-link">{prompt.author}</a></div>
              <div>Published: {prompt.published}</div>
            </div>
          </div>

          {/* Multiply Ads Section */}
          <div className="ad-repeater" style={{ marginTop: '4rem' }}>
            <Banner728x90 />
            <Banner468x60 />
            <Banner728x90 />
            <Banner468x60 />
            <Banner728x90 />
          </div>

          <div className="derived-content" style={{ marginTop: '4rem' }}>
            <h2 className="card-title" style={{ fontSize: '2rem' }}>Creative Applications</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
              This prompt for <strong>{prompt.title}</strong> is optimized for high-end AI models like Ecotron. 
              By utilizing {prompt.category} techniques, it achieves a unique blend of {prompt.description.split(' ').slice(0, 5).join(' ')}. 
              Ideal for designers looking for {prompt.category.toLowerCase()} results with precision and artistic flair.
            </p>
          </div>
        </div>

        <aside className="detail-sidebar">
          <div className="sticky-sidebar" style={{ position: 'sticky', top: '100px' }}>
            <Banner300x250 />
            <Banner160x300 />
            <Banner300x250 />
            <Banner160x300 />
            <Banner300x250 />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PromptDetail;
