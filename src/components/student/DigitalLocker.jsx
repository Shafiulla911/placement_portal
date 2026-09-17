import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  ShieldCheck,
  Download,
  FolderGit2,
  Building2
} from 'lucide-react';

export const DigitalLocker = () => {
  const { studentProfile, showToast } = useApp();

  const handleDownloadTranscript = () => {
    showToast("Generating tamper-proof NEP 2020 Verified Competency Transcript (PDF)...", "success");
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <ShieldCheck size={13} /> Digilocker & ABC Integrated
            </span>
            <span className="badge badge-indigo">National Skill Qualification Framework (NSQF)</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            NEP 2020 Digital Skill & Credential Locker
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem' }}>
            Cryptographically signed micro-credentials, industrial project validations, and Academic Bank of Credits balance.
          </p>
        </div>

        <button onClick={handleDownloadTranscript} className="btn btn-emerald">
          <Download size={16} /> Export Verified Transcript
        </button>
      </div>

      {/* Academic Bank of Credits Summary Card */}
      <div
        className="glass-card"
        style={{
          padding: '22px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          borderLeft: '4px solid #10b981'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            ABC Student ID
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px', fontFamily: 'monospace' }}>
            ABC-2026-IND-9948271
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6ee7b7', marginTop: '4px' }}>
            ● Linked with DigiLocker Aadhaar
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Total Earned Credits
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a5b4fc', marginTop: '2px' }}>
            {studentProfile.nepCredits} / 160
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Degree requirement 92.5% fulfilled
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Industry Capstone Credits
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6ee7b7', marginTop: '2px' }}>
            16 Credits
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Earned via corporate live projects
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Blockchain Hash Status
          </div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fcd34d', marginTop: '4px', fontFamily: 'monospace' }}>
            SHA256: 8f2d...c41e
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6ee7b7', marginTop: '4px' }}>
            ✓ Verified on National Academic Ledger
          </div>
        </div>
      </div>

      {/* Verified Micro-Credentials Grid */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem' }}>Verified Certifications & Apex Micro-Credentials</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Directly verifiable by recruiters during campus placements
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {studentProfile.certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-card"
              style={{
                padding: '18px',
                display: 'flex',
                gap: '16px',
                borderLeft: '4px solid #6366f1'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#818cf8',
                  flexShrink: 0
                }}
              >
                <Award size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{cert.title}</h3>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                    <ShieldCheck size={11} /> Verified
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Issuer: <span style={{ color: '#f8fafc', fontWeight: 500 }}>{cert.issuer}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Issued: {cert.date}</span>
                  <span style={{ fontFamily: 'monospace', color: '#a5b4fc' }}>ID: {cert.credentialId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Capstone & Industry Project Endorsements */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <FolderGit2 size={20} className="text-indigo-400" />
          <h2 style={{ fontSize: '1.15rem' }}>Industry-Endorsed Capstones & Live Projects</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
          {studentProfile.projects.map((proj, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: '20px', borderLeft: '4px solid #06b6d4' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{proj.title}</h3>
                <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
                  Live Pilot
                </span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '10px 0', lineHeight: '1.5' }}>
                {proj.description}
              </p>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {proj.techStack.map(tech => (
                  <span key={tech} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div
                style={{
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  color: '#6ee7b7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Building2 size={13} />
                <span>Industry Evaluator: {proj.industryPartner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
