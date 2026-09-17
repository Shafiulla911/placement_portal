import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CheckCircle2,
  Sparkles,
  UserCheck,
  Calendar
} from 'lucide-react';

export const CandidateSearch = () => {
  const { candidates, updateCandidateStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMatch, setFilterMatch] = useState('all'); // 'all' | '90' | '80'

  const filteredCandidates = candidates.filter((cand) => {
    const matchesQuery =
      cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.topSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesQuery) return false;

    if (filterMatch === '90') return cand.matchWithActiveJob >= 90;
    if (filterMatch === '80') return cand.matchWithActiveJob >= 80;
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Filter Controls */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search candidate profiles by skill (Python, React, FHIR), name, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '42px' }}
          />
        </div>

        {/* Match Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filter by Match:</span>
          {['all', '90', '80'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterMatch(f)}
              className={`btn btn-sm ${filterMatch === f ? 'btn-primary' : 'btn-secondary'}`}
            >
              {f === 'all' ? 'All Talent' : `> ${f}% Match`}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: cand.matchWithActiveJob >= 90 ? '4px solid #10b981' : '4px solid #6366f1'
            }}
          >
            <div>
              {/* Profile Top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '2px solid #818cf8'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{cand.name}</h2>
                      <CheckCircle2 size={15} color="#10b981" />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {cand.degree}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {cand.college}
                    </div>
                  </div>
                </div>

                <span
                  className={cand.matchWithActiveJob >= 90 ? "badge badge-emerald" : "badge badge-indigo"}
                  style={{ fontSize: '0.82rem', fontWeight: 800, padding: '4px 10px' }}
                >
                  <Sparkles size={13} /> {cand.matchWithActiveJob}% Match
                </span>
              </div>

              {/* Metrics row: CGPA, ABC Credits, Status */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '16px 0',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>CGPA: </span>
                  <span style={{ fontWeight: 700, color: '#f8fafc' }}>{cand.cgpa}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>ABC Credits: </span>
                  <span style={{ fontWeight: 700, color: '#6ee7b7' }}>{cand.nepCredits}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Status: </span>
                  <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                    {cand.status}
                  </span>
                </div>
              </div>

              {/* Top Verified Skills */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                  Verified Competencies:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {cand.topSkills.map((sk) => (
                    <span key={sk} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recruiter Action Buttons */}
            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '14px',
                display: 'flex',
                gap: '8px'
              }}
            >
              <button
                onClick={() => updateCandidateStatus(cand.id, 'Shortlisted')}
                className="btn btn-outline-primary btn-sm"
                style={{ flex: 1 }}
              >
                <UserCheck size={14} /> Shortlist
              </button>
              <button
                onClick={() => updateCandidateStatus(cand.id, 'Interview Scheduled')}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                <Calendar size={14} /> Schedule Interview
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
