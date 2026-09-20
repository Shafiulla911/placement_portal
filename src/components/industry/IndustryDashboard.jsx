import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import {
  Briefcase,
  Users,
  Search,
  Sparkles,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const IndustryDashboard = () => {
  const { internships, candidates, setActiveTab, capstoneList } = useApp();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Recruiter Welcome Banner */}
      <div className="hero-welcome-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-role">MoU Accredited Partner</span>
            <span className="badge badge-role">Campus Hiring Drive 2026</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Industry Recruiter & Collaboration <span className="text-gradient-primary">Command Center</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.92rem', maxWidth: '700px' }}>
            All India Institute of Ayurveda & Apollo TeleHealth Campus Talent Desk • Filter candidates by verified AICTE/NEP skill credentials.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('post-job')} className="btn btn-primary">
            <PlusCircle size={16} /> Post Opportunity
          </button>
          <button onClick={() => setActiveTab('candidates')} className="btn btn-secondary">
            <Search size={16} /> Search Talent
          </button>
        </div>
      </div>

      {/* Recruiter KPI Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="Active Openings"
          value={internships.length}
          subtitle="Internships & PPO tracks"
          icon={Briefcase}
          trend="+3 new this week"
          color="indigo"
        />
        <StatCard
          title="Candidate Applications"
          value="42 Applicants"
          subtitle="89% Avg Skill Alignment"
          icon={Users}
          trend="8 Under Review"
          color="emerald"
        />
        <StatCard
          title="Sponsored Capstones"
          value={`${capstoneList.length} Grants`}
          subtitle="44 Student Teams Enrolled"
          icon={Sparkles}
          trend="High Innovation Output"
          color="cyan"
        />
        <StatCard
          title="Hiring Efficiency"
          value="4.2 Days"
          subtitle="Time to shortlist vs 21 days industry avg"
          icon={TrendingUp}
          trend="75% Time Saved"
          color="amber"
        />
      </div>

      {/* Two Column Section: Pipeline Funnel + Live Opportunities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Candidate Hiring Funnel */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.15rem' }}>Recruitment Funnel & Shortlisting</h2>
            <button onClick={() => setActiveTab('candidates')} className="btn btn-secondary btn-sm">
              View All Candidates
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { stage: "Profiles Evaluated via AI Skill Match", count: 184, percent: 100, color: "var(--primary)" },
              { stage: "Matched Skills Threshold (>80%)", count: 52, percent: 70, color: "#818cf8" },
              { stage: "Shortlisted for Technical Round", count: 18, percent: 45, color: "#06b6d4" },
              { stage: "Final Interview Scheduled", count: 8, percent: 25, color: "#f59e0b" },
              { stage: "Offers Extended & PPO Accepted", count: 4, percent: 12, color: "#10b981" }
            ].map((item, idx) => (
              <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                  <span>{item.stage}</span>
                  <span style={{ color: item.color, fontWeight: 700 }}>{item.count}</span>
                </div>
                <div className="progress-track" style={{ height: '6px' }}>
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 'var(--radius-full)',
                      background: item.color,
                      width: `${item.percent}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Matching Candidates Spotlight */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.15rem' }}>Top Ranked Student Profiles</h2>
            <span className="badge badge-emerald">Sorted by Match %</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {candidates.slice(0, 3).map((cand) => (
              <div
                key={cand.id}
                className="glass-card"
                style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #818cf8' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{cand.name}</span>
                      <CheckCircle2 size={13} color="#10b981" />
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {cand.college}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#a5b4fc', marginTop: '2px' }}>
                      CGPA: {cand.cgpa} • ABC Credits: {cand.nepCredits}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="badge badge-emerald" style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {cand.matchWithActiveJob}% Match
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <button
                      onClick={() => setActiveTab('candidates')}
                      className="btn btn-outline-primary btn-sm"
                      style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                    >
                      Review <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
