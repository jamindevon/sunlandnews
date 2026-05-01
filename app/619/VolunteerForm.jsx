'use client';
import { useState } from 'react';

export default function VolunteerForm() {
  const [role, setRole] = useState('');

  return (
    <div className="animate-fade-in-up">
      <h3 style={{ marginBottom: '1rem', color: 'var(--poster-red)' }}>Volunteer Registration</h3>
      <p style={{ marginBottom: '2rem', fontWeight: 600 }}>
        June 18th 3PM - 10PM (General volunteer)
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Select Role *</label>
          <div className="radio-group">
            {['Welcome Attendant', 'Parking Attendant', 'Setup Team', 'Clean-up crew'].map((r) => (
              <label 
                key={r} 
                className={`radio-card ${role === r ? 'selected' : ''}`}
                onClick={() => setRole(r)}
              >
                <input 
                  type="radio" 
                  name="role" 
                  value={r} 
                  checked={role === r}
                  onChange={() => setRole(r)}
                  style={{ pointerEvents: 'none' }}
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>First Name *</label>
            <input type="text" className="form-control" placeholder="First Name" required />
          </div>
          <div style={{ flex: 1 }}>
            <label>Last Name *</label>
            <input type="text" className="form-control" placeholder="Last Name" required />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" className="form-control" placeholder="example@example.com" required />
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input type="tel" className="form-control" placeholder="(000) 000-0000" pattern="[\(]\d{3}[\)] \d{3}-\d{4}" title="Format: (000) 000-0000" required />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          Register as Volunteer
        </button>
      </form>
    </div>
  );
}
