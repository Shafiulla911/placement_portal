import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import {
  Globe2,
  TrendingUp,
  School,
  Building2,
  Award,
  Zap,
  MapPin,
  Sparkles
} from 'lucide-react';

export const NationalOverview = () => {
  const { nationalData, showToast } = useApp();

  const handlePolicyDispatch = () => {
    showToast("Dispatched National Skill Gap Intervention Circular to 1,480+ State Affiliated Colleges!", "success");
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="hero-welcome-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-role">
              <Globe2 size={13} /> Apex National Oversight
            </span>
            <span className="badge badge-role">Ministry of Ayush & AICTE Co-Initiative</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            National Skill Intelligence & <span className="text-gradient-primary">Placement Observatory</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.92rem', maxWidth: '750px' }}>
            Macro-level dashboard aggregating curriculum alignment, district employment indices, and emerging industrial skill demands under NEP 2020.
          </p>
        </div>

        <button onClick={handlePolicyDispatch} className="btn btn-primary">
          <Zap size={16} /> Issue Regional Policy Advisory
        </button>
      </div>

      {/* Macro National KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="National Readiness Index"
          value={`${nationalData.nationalSkillReadinessIndex}%`}
          subtitle="Composite competency score across 28 states"
          icon={TrendingUp}
          trend="+6.8% YoY"
          color="emerald"
        />
        <StatCard
          title="Affiliated Institutions"
          value={nationalData.participatingInstitutions.toLocaleString()}
          subtitle="Universities & Polytechnics onboarded"
          icon={School}
          trend="Tier-2 & Tier-3 Enabled"
          color="indigo"
        />
        <StatCard
          title="Industry Partners"
          value={nationalData.industryPartnersJoined.toLocaleString()}
          subtitle="Companies offering verified internships"
          icon={Building2}
          trend="+320 this quarter"
          color="cyan"
        />
        <StatCard
          title="Internships Completed"
          value={nationalData.internshipsCompletedThisYear.toLocaleString()}
          subtitle="Academic credits registered in ABC"
          icon={Award}
          trend="84% Placement Conversion"
          color="amber"
        />
      </div>

      {/* Two Column Grid: Top Surging Skills + District League */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Emerging Skills Demand Trends */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem' }}>Surging Industrial Skills (2026 Demand)</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Based on active vacancy growth across national job boards
              </p>
            </div>
            <span className="badge badge-indigo">Live Market Telemetry</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {nationalData.topSurgingSkills.map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{item.skill}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Hiring Volume: <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{item.demandVolume}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-emerald" style={{ fontWeight: 800, fontSize: '0.82rem' }}>
                    {item.growthPercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* District Readiness Tiers */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem' }}>District & Regional Skill Index</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Performance tracking for targeted government upskilling grants
              </p>
            </div>
            <span className="badge badge-cyan">District Evaluation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {nationalData.districtReadinessTiers.map((dist, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#818cf8" />
                    <span>{dist.district}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {dist.colleges} Institutions • Placement Rate: <strong style={{ color: '#6ee7b7' }}>{dist.placementRate}%</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                    {dist.avgReadiness}%
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Readiness
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AICTE Policy Action Notice */}
      <div
        className="glass-card"
        style={{
          padding: '20px 24px',
          borderLeft: '4px solid #f59e0b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#fcd34d' }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Automated AICTE / Ayush Interventions Recommendation
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Ayush Informatics skills have a 44% demand surplus vs curriculum supply in Tier-2 colleges. Recommended action: Mandate 4-week NPTEL FHIR modules into 7th semester syllabi.
            </div>
          </div>
        </div>

        <button onClick={handlePolicyDispatch} className="btn btn-outline-primary btn-sm">
          Approve Directive
        </button>
      </div>
    </div>
  );
};
