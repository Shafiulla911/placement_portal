import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Building2,
  School,
  Globe2,
  Sparkles,
  Bell,
  X,
  Menu,
  LogOut
} from 'lucide-react';

export const Navbar = () => {
  const { currentRole, setCurrentRole, studentProfile, handleLogout, loggedInUser, mobileMenuOpen, setMobileMenuOpen } = useApp();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getRoleUserDisplay = () => {
    const isCustomUser = loggedInUser && loggedInUser.name;
    switch (currentRole) {
      case 'student':
        return {
          name: isCustomUser ? loggedInUser.name : studentProfile.name,
          role: loggedInUser?.college || studentProfile.college || "B.Tech Final Year • AIIA New Delhi",
          avatar: studentProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        };
      case 'industry':
        return {
          name: isCustomUser ? loggedInUser.name : "Suresh Narayanan",
          role: loggedInUser?.college ? `Hiring Lead • ${loggedInUser.college}` : "VP Engineering & Campus Head • Apollo & AIIA",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
        };
      case 'academia':
        return {
          name: isCustomUser ? loggedInUser.name : "Prof. Radhika Rao",
          role: loggedInUser?.college ? `Dean / TPO • ${loggedInUser.college}` : "Dean & Head TPO • All India Institute of Tech",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        };
      case 'national':
        return {
          name: isCustomUser ? loggedInUser.name : "Apex National Administrator",
          role: "Apex Monitoring • AICTE & Ministry of Ayush",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
        };
      default:
        return { name: "Guest User", role: "Viewer", avatar: "" };
    }
  };

  const userDisplay = getRoleUserDisplay();
  const isAdminUser = Boolean(loggedInUser?.isAdmin || loggedInUser?.role === 'admin' || loggedInUser?.role === 'national');

  return (
    <header className="main-navbar">
      <div className="navbar-inner">
        {/* Brand & Problem Statement Title */}
        <div className="navbar-brand">
          <div
            className="navbar-logo-icon"
            style={{
              background: 'var(--role-logo-gradient)',
              boxShadow: 'var(--role-logo-shadow)',
              transition: 'all 0.5s ease'
            }}
          >
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div className="navbar-brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="navbar-brand-name">
                EduBridge <span className="text-gradient-primary">AI</span>
              </span>
              <span
                className="badge navbar-badge-hide-mobile"
                style={{
                  fontSize: '0.7rem',
                  background: 'var(--role-badge-bg)',
                  color: 'var(--role-badge-color)',
                  borderColor: 'var(--role-badge-border)',
                  transition: 'all 0.4s ease'
                }}
              >
                SIH26044 PROTOTYPE
              </span>
            </div>
            <div className="navbar-subtitle">
              Academia–Industry Collaboration for Skill Mapping & Internships
            </div>
          </div>
        </div>

        {/* Central Role Header / Persona Badge - Desktop */}
        <div className="navbar-role-center hide-mobile">
          {isAdminUser ? (
            <>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                Apex Admin Persona Control
              </div>
              <div className="role-pill-bar">
                <button
                  className={`role-pill-btn ${currentRole === 'national' ? 'active' : ''}`}
                  onClick={() => setCurrentRole('national')}
                  title="View as Apex / Ministry"
                  style={currentRole === 'national' ? { background: 'var(--role-gradient)', borderColor: 'var(--role-border)', color: '#ffffff' } : {}}
                >
                  <Globe2 size={15} />
                  <span>Apex Directorate</span>
                </button>
                <button
                  className={`role-pill-btn ${currentRole === 'student' ? 'active' : ''}`}
                  onClick={() => setCurrentRole('student')}
                  title="View as Student"
                  style={currentRole === 'student' ? { background: 'var(--role-gradient)', borderColor: 'var(--role-border)', color: '#ffffff' } : {}}
                >
                  <GraduationCap size={15} />
                  <span>Student</span>
                </button>
                <button
                  className={`role-pill-btn ${currentRole === 'industry' ? 'active' : ''}`}
                  onClick={() => setCurrentRole('industry')}
                  title="View as Industry Recruiter"
                  style={currentRole === 'industry' ? { background: 'var(--role-gradient)', borderColor: 'var(--role-border)', color: '#ffffff' } : {}}
                >
                  <Building2 size={15} />
                  <span>Industry</span>
                </button>
                <button
                  className={`role-pill-btn ${currentRole === 'academia' ? 'active' : ''}`}
                  onClick={() => setCurrentRole('academia')}
                  title="View as College TPO / Dean"
                  style={currentRole === 'academia' ? { background: 'var(--role-gradient)', borderColor: 'var(--role-border)', color: '#ffffff' } : {}}
                >
                  <School size={15} />
                  <span>Academia</span>
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                className="badge"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  gap: '8px',
                  background: 'var(--role-badge-bg)',
                  color: 'var(--role-badge-color)',
                  borderColor: 'var(--role-border)',
                  boxShadow: '0 4px 16px var(--role-glow-subtle)',
                  transition: 'all 0.4s ease'
                }}
              >
                {currentRole === 'student' && <><GraduationCap size={17} /> Student & Graduate Career Portal</>}
                {currentRole === 'industry' && <><Building2 size={17} /> Enterprise Recruiter & Talent Portal</>}
                {currentRole === 'academia' && <><School size={17} /> Higher Education & TPO Institutional Portal</>}
                {currentRole === 'national' && <><Globe2 size={17} /> Apex National Skill Directorate</>}
              </div>
            </div>
          )}
        </div>

        {/* Right: User & Actions */}
        <div className="navbar-right">
          {/* Status Badge - Desktop */}
          <div className="navbar-status hide-mobile">
            <span className="status-dot" />
            <span style={{ fontWeight: 600 }}>NEP 2020 & Ayush Aligned</span>
          </div>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="navbar-icon-btn"
            >
              <Bell size={18} />
              <span className="notif-badge-dot">3</span>
            </button>

            {notificationsOpen && (
              <div
                className="glass-panel notif-dropdown"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc' }}>
                    Live Notifications (3 New)
                  </span>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { title: "Application Shortlisted", desc: "All India Institute of Ayurveda shortlisted your profile for Technical Round.", time: "10m ago", color: "#10b981" },
                    { title: "Curriculum Council Notice", desc: "Syllabus revision for CS-402 approved with 2 NPTEL AICTE credits.", time: "1h ago", color: "#6366f1" },
                    { title: "New Capstone Challenge", desc: "TCS Innovation Hub posted ₹1,20,000 grant for student teams.", time: "3h ago", color: "#06b6d4" }
                  ].map((notif, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-sm)',
                        borderLeft: `3px solid ${notif.color}`,
                        fontSize: '0.78rem'
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#f8fafc', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{notif.title}</span>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '3px', lineHeight: '1.4' }}>
                        {notif.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar - Desktop */}
          <div
            className="navbar-user-chip hide-mobile"
            style={{
              border: '1px solid var(--role-border)',
              boxShadow: '0 2px 12px var(--role-glow-subtle)',
              transition: 'all 0.4s ease'
            }}
          >
            <img
              src={userDisplay.avatar}
              alt={userDisplay.name}
              className="navbar-avatar"
            />
            <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {userDisplay.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {userDisplay.role}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="navbar-icon-btn hide-mobile"
            title="Sign Out"
            style={{ color: '#f43f5e' }}
          >
            <LogOut size={18} />
          </button>

          {/* Mobile Hamburger */}
          <button
            className="navbar-icon-btn show-mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {/* User Info */}
          <div className="mobile-drawer-user">
            <img src={userDisplay.avatar} alt="" className="navbar-avatar" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{userDisplay.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userDisplay.role}</div>
            </div>
          </div>

          {/* Role Switcher - Admin only */}
          {isAdminUser && (
            <>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700, marginBottom: '8px' }}>
                Switch Persona
              </div>
              <div className="mobile-role-grid">
                {[
                  { key: 'national', Icon: Globe2, label: 'Apex' },
                  { key: 'student', Icon: GraduationCap, label: 'Student' },
                  { key: 'industry', Icon: Building2, label: 'Industry' },
                  { key: 'academia', Icon: School, label: 'Academia' },
                ].map(r => (
                  <button
                    key={r.key}
                    className={`mobile-role-btn ${currentRole === r.key ? 'active' : ''}`}
                    onClick={() => setCurrentRole(r.key)}
                  >
                    <r.Icon size={16} />
                    {r.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '16px', color: '#f43f5e', borderColor: 'rgba(244, 63, 94, 0.3)' }}
            onClick={handleLogout}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
};
