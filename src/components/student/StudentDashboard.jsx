import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import {
  Award,
  Briefcase,
  Sparkles,
  BookOpen,
  Calendar,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export const StudentDashboard = () => {
  const { studentProfile, applications, internships, setActiveTab, applyToInternship } = useApp();

  // Filter top matches
  const topMatches = internships.filter(i => i.matchScore >= 80).slice(0, 3);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero Welcome Banner */}
      <div className="hero-welcome-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-role">NEP 2020 Credit Aligned</span>
            <span className="badge badge-role">Industry Placement Active</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Welcome back, <span className="text-gradient-primary">{studentProfile.name}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '650px', fontSize: '0.92rem' }}>
            {studentProfile.department} • {studentProfile.college}
          </p>
        </div>

        {/* Readiness Meter Gauge */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '16px 22px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: `conic-gradient(#10b981 0% ${studentProfile.readinessScore || 84}%, rgba(255, 255, 255, 0.1) ${studentProfile.readinessScore || 84}% 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                color: '#10b981'
              }}
            >
              {studentProfile.readinessScore || 84}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Placement Readiness
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
              Tier-1 Industry Ready
            </div>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="btn btn-outline-primary btn-sm"
              style={{ marginTop: '8px', padding: '4px 10px', fontSize: '0.75rem' }}
            >
              Run Skill-Gap AI <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <StatCard
          title="Verified Skills"
          value="9 Competencies"
          subtitle="6 Gold badges via NPTEL & Labs"
          icon={Award}
          trend="+2 this month"
          color="indigo"
        />
        <StatCard
          title="Active Applications"
          value={applications.length}
          subtitle="1 Interview scheduled"
          icon={Briefcase}
          trend="89% Avg Match"
          color="emerald"
        />
        <StatCard
          title="ABC Credit Balance"
          value={`${studentProfile.nepCredits} Credits`}
          subtitle="Verified in Academic Bank of Credits"
          icon={BookOpen}
          trend="100% Eligible"
          color="cyan"
        />
        <StatCard
          title="Curriculum Benchmark"
          value="91.4%"
          subtitle="Alignment with National Industry standard"
          icon={TrendingUp}
          trend="+14% vs batch avg"
          color="amber"
        />
      </div>

      {/* Main Grid: Application Pipeline + Verified Skills Snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Active Application Stages */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} className="text-indigo-400" />
              <h2 style={{ fontSize: '1.15rem' }}>Active Application Pipeline</h2>
            </div>
            <button
              onClick={() => setActiveTab('internships')}
              className="btn btn-secondary btn-sm"
            >
              Browse All Drives
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {applications.map((app) => (
              <div
                key={app.id}
                className="glass-card"
                style={{ padding: '16px', borderLeft: '4px solid var(--primary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{app.title}</h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {app.company}
                    </div>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>
                    {app.matchScore}% Match
                  </span>
                </div>

                {/* Stepper Status Bar */}
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <span style={{ color: app.stage >= 1 ? '#6ee7b7' : 'inherit', fontWeight: app.stage === 1 ? 700 : 400 }}>1. Applied</span>
                    <span style={{ color: app.stage >= 2 ? '#818cf8' : 'inherit', fontWeight: app.stage === 2 ? 700 : 400 }}>2. Shortlisted</span>
                    <span style={{ color: app.stage >= 3 ? '#fcd34d' : 'inherit' }}>3. Tech Round</span>
                    <span style={{ color: app.stage >= 4 ? '#67e8f9' : 'inherit' }}>4. Offer</span>
                  </div>
                  <div className="progress-track" style={{ height: '6px' }}>
                    <div
                      className="progress-fill progress-fill-primary"
                      style={{ width: `${(app.stage / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    color: '#a5b4fc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Calendar size={14} />
                  <span>Next Step: {app.nextStep}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Matched Internships */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#f59e0b" />
              <h2 style={{ fontSize: '1.15rem' }}>AI-Matched Opportunities</h2>
            </div>
            <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
              High Compatibility
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {topMatches.map((job) => {
              const isApplied = applications.some(a => a.jobId === job.id);

              return (
                <div key={job.id} className="glass-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ maxWidth: '75%' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{job.title}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {job.company} • {job.location}
                      </div>
                    </div>
                    <span className="badge badge-emerald" style={{ fontWeight: 700 }}>
                      {job.matchScore}% Match
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '10px 0' }}>
                    {job.tags.map(tag => (
                      <span key={tag} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6ee7b7' }}>
                      {job.stipend}
                    </span>
                    {isApplied ? (
                      <span className="badge badge-emerald" style={{ padding: '6px 12px' }}>
                        <CheckCircle2 size={13} /> Applied
                      </span>
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

      </div>

      {/* Verified Skills & Industry Endorsements */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem' }}>Current Skill Matrix & Validation Status</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Verified through national NPTEL exams, college lab assessments, and industry capstones
            </p>
          </div>
          <button onClick={() => setActiveTab('skill-gap')} className="btn btn-emerald btn-sm">
            Compare Against Industry Roles
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {studentProfile.skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{skill.name}</span>
                {skill.verified ? (
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                    <CheckCircle2 size={11} /> Verified
                  </span>
                ) : (
                  <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>
                    Self-Assessed
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                <span>Source: {skill.source}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{skill.level}%</span>
              </div>

              <div className="progress-track">
                <div
                  className={`progress-fill ${skill.level >= 75 ? 'progress-fill-emerald' : 'progress-fill-primary'}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
