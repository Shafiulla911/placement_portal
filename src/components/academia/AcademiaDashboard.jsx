import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import {
  TrendingUp,
  Award,
  Handshake,
  BookOpenCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const AcademiaDashboard = () => {
  const { academiaData, setActiveTab } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div className="hero-welcome-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-role">NAAC A++ & AICTE Approved</span>
            <span className="badge badge-role">NEP 2020 Institutional Cell</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            <span className="text-gradient-primary">{academiaData.collegeName}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.92rem' }}>
            Training & Placement Office (TPO) • Industry-Academia Collaborative Intelligence Portal
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('curriculum')} className="btn btn-primary">
            <BookOpenCheck size={16} /> Review Curriculum Gaps
          </button>
          <button onClick={() => setActiveTab('mous')} className="btn btn-secondary">
            <Handshake size={16} /> Manage MoUs ({academiaData.activeMoUsCount})
          </button>
        </div>
      </div>

      {/* Institutional Placement KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="Placement Rate"
          value={`${academiaData.placedPercentage}%`}
          subtitle={`${Math.round(academiaData.eligibleBatch * (academiaData.placedPercentage / 100))} of ${academiaData.eligibleBatch} placed`}
          icon={Award}
          trend="+5.2% vs 2025"
          color="emerald"
        />
        <StatCard
          title="Average Package"
          value={`₹${academiaData.avgPackageLPA} LPA`}
          subtitle={`Highest Package: ₹${academiaData.highestPackageLPA} LPA`}
          icon={TrendingUp}
          trend="+1.2 LPA growth"
          color="indigo"
        />
        <StatCard
          title="Active Industry MoUs"
          value={`${academiaData.activeMoUsCount} Partners`}
          subtitle="Ministry of Ayush, TCS, Apollo"
          icon={Handshake}
          trend="4 Renewals active"
          color="cyan"
        />
        <StatCard
          title="Live Capstone Projects"
          value={`${academiaData.industryProjectsLive} Projects`}
          subtitle="Funded by Corporate Innovation Grants"
          icon={Building2}
          trend="100% Industry Mentored"
          color="amber"
        />
      </div>

      {/* Department-Wise Readiness & Placement Radar Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem' }}>Department-Wise Placement Readiness Breakdown</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Real-time student skill competency aggregation across all engineering and healthcare disciplines
            </p>
          </div>
          <button onClick={() => setActiveTab('students')} className="btn btn-secondary btn-sm">
            View All Enrolled Cohort
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Academic Department</th>
                <th style={{ padding: '12px 14px' }}>Enrolled Students</th>
                <th style={{ padding: '12px 14px' }}>Placed / Shortlisted</th>
                <th style={{ padding: '12px 14px' }}>Readiness Score</th>
                <th style={{ padding: '12px 14px' }}>Top Hiring Partner</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {academiaData.departmentBreakdown.map((dept) => {
                const percent = Math.round((dept.placed / dept.enrolled) * 100);

                return (
                  <tr key={dept.department} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '14px', fontWeight: 600, color: '#f8fafc' }}>
                      {dept.department}
                    </td>
                    <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                      {dept.enrolled}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span style={{ fontWeight: 700, color: '#6ee7b7' }}>{dept.placed}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>({percent}%)</span>
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="progress-track" style={{ width: '70px', height: '6px' }}>
                          <div
                            className={`progress-fill ${dept.readinessAvg >= 85 ? 'progress-fill-emerald' : 'progress-fill-primary'}`}
                            style={{ width: `${dept.readinessAvg}%` }}
                          />
                        </div>
                        <span style={{ fontWeight: 700 }}>{dept.readinessAvg}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px', color: '#a5b4fc', fontWeight: 500 }}>
                      {dept.topHiringCompany}
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={12} /> Placement Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
