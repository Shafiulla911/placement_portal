import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  Send,
  Sparkles
} from 'lucide-react';

export const CurriculumMapping = () => {
  const { academiaData, submitCurriculumRevision } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <Sparkles size={13} /> AICTE Model Curriculum Engine
          </span>
          <span className="badge badge-amber">Curriculum–Market Alignment</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          AI-Driven Curriculum & Syllabus Gap Analysis
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '750px', marginTop: '4px' }}>
          Automatically scans semester syllabi and compares against 2,800+ live corporate job postings to pinpoint outdated course units and recommend modern modules.
        </p>
      </div>

      {/* Curriculum Gap Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {academiaData.curriculumGaps.map((gap, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '24px',
              borderLeft: gap.gapDeficitPercent >= 40 ? '4px solid #f43f5e' : '4px solid #f59e0b'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                  Course Syllabus Under Review
                </span>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '6px' }}>
                  {gap.courseSubject}
                </h2>
              </div>

              <div
                className={gap.gapDeficitPercent >= 40 ? "badge badge-rose" : "badge badge-amber"}
                style={{ fontSize: '0.85rem', fontWeight: 700, padding: '5px 12px' }}
              >
                <AlertTriangle size={13} /> {gap.gapDeficitPercent}% Industry Deficit Gap
              </div>
            </div>

            {/* Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', margin: '18px 0' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Current College Syllabus Content
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                  {gap.syllabusCoverage}
                </p>
              </div>

              <div
                style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(99, 102, 241, 0.25)'
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: 700 }}>
                  What Top Employers Require in 2026
                </div>
                <p style={{ fontSize: '0.88rem', color: '#f8fafc', marginTop: '6px', lineHeight: '1.5', fontWeight: 500 }}>
                  {gap.industryDemand}
                </p>
              </div>
            </div>

            {/* Action Status & Co-Design Partners */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '14px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status:</div>
                <div style={{ fontSize: '0.84rem', color: '#6ee7b7', fontWeight: 600 }}>
                  {gap.actionStatus}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Co-Design Partners:</span>
                {gap.recommendedIndustryPartners.map(p => (
                  <span key={p} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                    {p}
                  </span>
                ))}
              </div>

              <button
                onClick={() => submitCurriculumRevision(gap.courseSubject.split(':')[0])}
                className="btn btn-primary btn-sm"
              >
                <Send size={13} /> Push Revision to Council
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
