import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Building2,
  Sparkles,
  ArrowUpRight,
  Handshake
} from 'lucide-react';

export const InternshipBoard = () => {
  const { internships, applications, applyToInternship, studentProfile } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'high-match' | 'ayush' | 'ppo'

  // Filter logic
  const filteredJobs = internships.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'high-match') return job.matchScore >= 85;
    if (filterType === 'ayush') return job.tags.some(t => t.toLowerCase().includes('ayush'));
    if (filterType === 'ppo') return job.type.includes('Placement') || job.type.includes('PPO');
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search and Filters Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '22px',
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
            placeholder="Search internships by skill, title, or company (e.g. Python, AIIA, TCS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '42px' }}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Opportunities' },
            { id: 'high-match', label: 'High Match (>85%)' },
            { id: 'ayush', label: 'Ayush & Biotech' },
            { id: 'ppo', label: 'PPO & Placement Tracks' }
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setFilterType(pill.id)}
              className={`btn btn-sm ${filterType === pill.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {filteredJobs.map((job) => {
          const isApplied = applications.some((a) => a.jobId === job.id);

          return (
            <div
              key={job.id}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: job.matchScore >= 85 ? '4px solid #10b981' : '4px solid #6366f1'
              }}
            >
              <div>
                {/* Header: Company, Match Badge, Partner MoU */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div>
                    <span className="badge badge-indigo" style={{ fontSize: '0.7rem', marginBottom: '6px' }}>
                      {job.type}
                    </span>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{job.title}</h2>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={14} />
                      <span>{job.company}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div
                      className={job.matchScore >= 85 ? "badge badge-emerald" : "badge badge-indigo"}
                      style={{ fontSize: '0.82rem', padding: '4px 10px', fontWeight: 700 }}
                    >
                      <Sparkles size={12} /> {job.matchScore}% Match
                    </div>
                  </div>
                </div>

                {/* MoU Partnership Badge */}
                {job.partnerMoU && (
                  <div
                    style={{
                      margin: '12px 0',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.74rem',
                      color: '#a5b4fc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Handshake size={13} />
                    <span>MoU: {job.partnerMoU}</span>
                  </div>
                )}

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '12px 0', lineHeight: '1.5' }}>
                  {job.description}
                </p>

                {/* Logistics Info: Location, Stipend, Duration, Deadline */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', margin: '14px 0', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#818cf8" />
                    <span>{job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={14} color="#6ee7b7" />
                    <span style={{ fontWeight: 600, color: '#6ee7b7' }}>{job.stipend}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#fcd34d" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={14} color="#94a3b8" />
                    <span>{job.openings} Open Positions</span>
                  </div>
                </div>

                {/* Required Skills with Student Compatibility Indicators */}
                <div style={{ marginTop: '14px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    Skill Alignment:
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {job.requirements.map((req) => {
                      const hasSkill = studentProfile.skills.some(
                        (s) => s.name.toLowerCase() === req.toLowerCase() && s.level >= 60
                      );

                      return (
                        <span
                          key={req}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            background: hasSkill ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.1)',
                            color: hasSkill ? '#6ee7b7' : '#fda4af',
                            border: hasSkill ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(244, 63, 94, 0.25)'
                          }}
                        >
                          {hasSkill ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                          {req}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div
                style={{
                  marginTop: '20px',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Eligible: {job.hiringBatch}
                </span>

                {isApplied ? (
                  <button
                    disabled
                    className="btn btn-secondary btn-sm"
                    style={{ opacity: 0.8, cursor: 'default' }}
                  >
                    <CheckCircle2 size={14} className="text-emerald-400" /> Applied
                  </button>
                ) : (
                  <button
                    onClick={() => applyToInternship(job)}
                    className="btn btn-primary btn-sm"
                  >
                    1-Click Apply <ArrowUpRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
