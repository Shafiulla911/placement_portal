import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BrainCircuit,
  Briefcase,
  Award,
  Users,
  Search,
  PlusCircle,
  FolderGit2,
  BookOpenCheck,
  Handshake,
  BarChart3,
  Flame,
  FileText,
  CheckCircle2
} from 'lucide-react';

export const Sidebar = () => {
  const { currentRole, activeTab, setActiveTab, mobileMenuOpen, internships, capstoneList, academiaData } = useApp();

  const navItemsByRole = {
    student: [
      { id: 'dashboard', label: 'My Readiness Radar', icon: LayoutDashboard },
      { id: 'skill-gap', label: 'AI Skill-Gap Analyzer', icon: BrainCircuit, badge: 'AI Engine', highlight: true },
      { id: 'resume-parser', label: 'AI Resume & ATS Parser', icon: FileText, badge: 'Smart ATS' },
      { id: 'assessment', label: 'Skill Verification Quiz', icon: CheckCircle2, badge: 'Badges' },
      { id: 'internships', label: 'Internships & Drives', icon: Briefcase, count: internships ? internships.length : 5 },
      { id: 'locker', label: 'NEP Digital Locker', icon: Award },
      { id: 'mentorship', label: '1:1 Expert Mentorship', icon: Users }
    ],
    industry: [
      { id: 'dashboard', label: 'Recruiter Dashboard', icon: LayoutDashboard },
      { id: 'candidates', label: 'AI Candidate Matcher', icon: Search, badge: 'Live Match', highlight: true },
      { id: 'post-job', label: 'Post Opportunity', icon: PlusCircle },
      { id: 'capstone', label: 'Capstone Challenges', icon: FolderGit2, count: capstoneList ? capstoneList.length : 3 }
    ],
    academia: [
      { id: 'dashboard', label: 'TPO Placement Analytics', icon: BarChart3 },
      { id: 'curriculum', label: 'Curriculum-Industry Gap', icon: BookOpenCheck, badge: 'AICTE', highlight: true },
      { id: 'mous', label: 'Corporate MoUs & Tie-Ups', icon: Handshake, count: academiaData ? academiaData.activeMoUsCount : 4 },
      { id: 'students', label: 'Batch Readiness Cohort', icon: Users }
    ],
    national: [
      { id: 'overview', label: 'Apex National Intel', icon: LayoutDashboard }
    ]
  };

  const activeItems = navItemsByRole[currentRole] || [];

  return (
    <aside className={`app-sidebar ${mobileMenuOpen ? 'sidebar-mobile-open' : ''}`}>
      <div
        className="glass-panel"
        style={{
          padding: '16px',
          position: 'sticky',
          top: '90px'
        }}
      >
        <div style={{ padding: '0 8px 12px 8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
            {currentRole.toUpperCase()} WORKSPACE
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {activeItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  background: isActive ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.1) 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon
                    size={18}
                    color={isActive ? '#818cf8' : 'currentColor'}
                    style={{ flexShrink: 0 }}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={item.highlight ? "badge badge-indigo" : "badge badge-emerald"}
                    style={{ fontSize: '0.65rem', padding: '2px 6px' }}
                  >
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && !item.badge && (
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Hackathon Guide Box */}
        <div
          style={{
            marginTop: '24px',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Flame size={15} className="text-amber-400" color="#f59e0b" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f8fafc' }}>
              SIH District Demo Tip
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            Switch personas in the top bar to showcase how students, universities, and industries collaborate in real time.
          </p>
        </div>
      </div>
    </aside>
  );
};
