import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await adminLogin(username.trim(), password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid admin username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px 60px', background: '#f4f9f4' }}>
      <div style={{ maxWidth: '420px', width: '100%', background: '#fff', padding: '40px 30px', borderRadius: '30px', boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '5px' }}>🔒</div>
          <span style={{ color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
            Ajara Nisarga Resort
          </span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--forest)', fontSize: '1.8rem', marginTop: '5px' }}>
            Admin Portal Login
          </h1>
        </div>

        {error && (
          <div style={{ background: '#ffebee', color: '#c62828', padding: '10px 15px', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '20px', borderLeft: '4px solid #c62828' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: 'var(--forest)', marginBottom: '6px' }}>
              Username
            </label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Admin username" 
              required 
              style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '0.95rem' }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: 'var(--forest)', marginBottom: '6px' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              required 
              style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '0.95rem' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-hover"
            style={{ width: '100%', background: 'var(--forest)', color: '#fff', padding: '14px', border: 'none', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </main>
  );
}
