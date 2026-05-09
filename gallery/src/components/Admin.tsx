import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPrompt, setNewPrompt] = useState({
    title: '',
    description: '',
    prompt: '',
    category: 'General',
    author: 'Admin',
    imageUrl: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-dark)' }}>
        <form onSubmit={handleLogin} style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', width: '400px' }}>
          <h2 className="card-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Ecotron Admin</h2>
          <input 
            type="text" 
            placeholder="Username" 
            className="search-bar-input" 
            style={{ width: '100%', marginBottom: '1rem', padding: '0.8rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="search-bar-input" 
            style={{ width: '100%', marginBottom: '2rem', padding: '0.8rem', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="filter-btn active" style={{ width: '100%', padding: '1rem' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ padding: '8rem 5% 5rem' }}>
      <h1 className="card-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Admin Dashboard</h1>
      
      <div className="add-prompt-form" style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '800px' }}>
        <h2 className="card-title">Add New Prompt to Library</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
          <input 
            type="text" 
            placeholder="Title" 
            style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
            onChange={(e) => setNewPrompt({...newPrompt, title: e.target.value})}
          />
          <textarea 
            placeholder="Description" 
            style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', minHeight: '100px' }}
            onChange={(e) => setNewPrompt({...newPrompt, description: e.target.value})}
          />
          <textarea 
            placeholder="Prompt Content" 
            style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', minHeight: '150px', fontFamily: 'monospace' }}
            onChange={(e) => setNewPrompt({...newPrompt, prompt: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Image URL" 
            style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
            onChange={(e) => setNewPrompt({...newPrompt, imageUrl: e.target.value})}
          />
          <button 
            className="filter-btn active" 
            style={{ padding: '1.2rem' }}
            onClick={() => {
              console.log('Admin Action: Syncing prompt...', newPrompt);
              alert('Prompt added successfully! In production, this would update the database.');
            }}
          >
            Publish to Ecotron Prompts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
