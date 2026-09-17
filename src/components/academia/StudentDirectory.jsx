import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Download
} from 'lucide-react';

export const StudentDirectory = () => {
  const { candidates, showToast } = useApp();
  const [search, setSearch] = useState('');

  // Additional mock cohort entries for a rich directory
  const cohort = [
    ...candidates,
    {
      id: "std-105",
      name: "Rohan Mukherjee",
      college: "AIIA New Delhi",
      degree: "B.Tech Bio-Informatics",
      cgpa: 8.2,
      readinessScore: 76,
      topSkills: ["Python (78%)", "SQL (70%)", "FHIR (60%)"],
      nepCredits: 138,
      status: "Shortlisted",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "std-106",
      name: "Sneha Patel",
      college: "AIIA New Delhi",
      degree: "B.Tech Computer Science",
      cgpa: 9.05,
      readinessScore: 89,
      topSkills: ["React (90%)", "Node.js (84%)", "AWS (75%)"],
      nepCredits: 152,
      status: "Offer Accepted",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
    }
  ];

  const filtered = cohort.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.degree.toLowerCase().includes(search.toLowerCase()) ||
    c.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
            placeholder="Search cohort by student name, degree, or placement status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '42px' }}
          />
        </div>

        <button
          onClick={() => showToast("Exported NAAC / AICTE Accredited Placement Readiness Report (Excel)", "success")}
          className="btn btn-secondary"
        >
          <Download size={15} /> Export Cohort Report
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Student Name</th>
                <th style={{ padding: '12px 14px' }}>Program / Degree</th>
                <th style={{ padding: '12px 14px' }}>CGPA</th>
                <th style={{ padding: '12px 14px' }}>Readiness Score</th>
                <th style={{ padding: '12px 14px' }}>ABC Credits</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Placement Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '14px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={s.avatar}
                        alt={s.name}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                    {s.degree}
                  </td>
                  <td style={{ padding: '14px', fontWeight: 600 }}>
                    {s.cgpa}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="progress-track" style={{ width: '70px', height: '6px' }}>
                        <div
                          className={`progress-fill ${s.readinessScore >= 85 ? 'progress-fill-emerald' : 'progress-fill-primary'}`}
                          style={{ width: `${s.readinessScore}%` }}
                        />
                      </div>
                      <span style={{ fontWeight: 700 }}>{s.readinessScore}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', color: '#6ee7b7', fontWeight: 600 }}>
                    {s.nepCredits}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <span
                      className={
                        s.status.includes('Offer')
                          ? 'badge badge-emerald'
                          : s.status.includes('Shortlist')
                          ? 'badge badge-indigo'
                          : 'badge badge-amber'
                      }
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
