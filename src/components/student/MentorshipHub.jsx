import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  Clock,
  Video,
  Sparkles,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const MentorshipHub = () => {
  const { mentors, bookMentorSession } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <Sparkles size={12} /> Academia-Industry Bridge
          </span>
          <span className="badge badge-emerald">Free for Affiliated Students</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          1-on-1 Industry Expert Mentorship Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem', maxWidth: '700px' }}>
          Connect directly with technical leads and hiring directors from our MoU partner companies for mock coding interviews, portfolio reviews, and career coaching.
        </p>
      </div>

      {/* Mentors Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '4px solid #8b5cf6'
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '2px solid #a5b4fc'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{mentor.name}</h2>
                    <CheckCircle2 size={15} color="#10b981" />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#a5b4fc', fontWeight: 500 }}>
                    {mentor.role}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Building2 size={13} /> {mentor.company}
                  </div>
                </div>
              </div>

              {/* Rating and Stats */}
              <div
                style={{
                  display: 'flex',
                  gap: '14px',
                  margin: '16px 0',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fcd34d', fontWeight: 700 }}>
                  <Star size={14} fill="#fcd34d" />
                  <span>{mentor.rating} / 5.0</span>
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  • {mentor.sessionsConducted} Sessions Conducted
                </div>
              </div>

              {/* Domains Covered */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                  Expertise & Advising Areas:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {mentor.domains.map((dom) => (
                    <span key={dom} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                      {dom}
                    </span>
                  ))}
                </div>
              </div>

              {/* Available Timeslot */}
              <div
                style={{
                  padding: '10px 12px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  color: '#6ee7b7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}
              >
                <Clock size={14} />
                <span>Next Slots: {mentor.availableSlots}</span>
              </div>
            </div>

            <button
              onClick={() => bookMentorSession(mentor)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Video size={15} /> Book 30-Min Session (Google Meet)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
