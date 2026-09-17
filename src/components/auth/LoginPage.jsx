import React, { useState } from 'react';
import {
  LogIn,
  Eye,
  EyeOff,
  Shield,
  GraduationCap,
  Building2,
  School,
  Globe2,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Fingerprint,
  Zap,
  BookOpen,
  Users,
  BarChart3,
  BrainCircuit
} from 'lucide-react';

const ROLE_CONFIG = {
  student: {
    icon: GraduationCap,
    label: 'Student',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #4f46e5, #818cf8)',
    desc: 'Access skill mapping, internships & career tools'
  },
  industry: {
    icon: Building2,
    label: 'Industry',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    desc: 'Post opportunities, search talent & capstone projects'
  },
  academia: {
    icon: School,
    label: 'Academia',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    desc: 'Curriculum alignment, MoU management & analytics'
  },
  admin: {
    icon: Shield,
    label: 'Admin',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    desc: 'Full platform control & national oversight'
  }
};

const FEATURES = [
  { icon: BrainCircuit, text: 'AI-Powered Skill Gap Analysis', color: '#818cf8' },
  { icon: BookOpen, text: 'NEP 2020 Aligned Curriculum', color: '#10b981' },
  { icon: Users, text: 'Industry-Academia Bridge', color: '#06b6d4' },
  { icon: BarChart3, text: 'National Skill Analytics', color: '#f59e0b' },
];

export const LoginPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (isRegister && !formData.name) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    // Admin login check
    if (selectedRole === 'admin') {
      if (formData.email === 'admin@edubridge.gov.in' && formData.password === 'admin123') {
        setTimeout(() => {
          onLogin({ role: 'national', user: { name: 'Admin', email: formData.email, isAdmin: true } });
          setLoading(false);
        }, 1200);
        return;
      } else {
        setError('Invalid admin credentials. Use: admin@edubridge.gov.in / admin123');
        setLoading(false);
        return;
      }
    }

    // Simulate login/register for other roles
    setTimeout(() => {
      onLogin({
        role: selectedRole,
        user: {
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          isAdmin: false
        }
      });
      setLoading(false);
    }, 1200);
  };

  const roleConfig = ROLE_CONFIG[selectedRole];

  return (
    <div className="auth-page">
      {/* Animated Background */}
      <div className="auth-bg-effects">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
        <div className="auth-grid-lines" />
      </div>

      <div className="auth-container">
        {/* Left Panel - Branding */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-logo-row">
              <div className="auth-logo-icon">
                <Sparkles size={28} />
              </div>
              <div>
                <h1 className="auth-brand-title">EduBridge AI</h1>
                <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                  <Zap size={10} /> SIH26044
                </span>
              </div>
            </div>

            <h2 className="auth-brand-headline">
              Portal for Academia–Industry Collaboration
            </h2>
            <p className="auth-brand-sub">
              Bridging the gap between education and employment through AI-powered 
              skill mapping, internships, and placement solutions aligned with NEP 2020.
            </p>

            <div className="auth-features-list">
              {FEATURES.map((f, i) => (
                <div key={i} className="auth-feature-item" style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
                  <div className="auth-feature-icon" style={{ background: `${f.color}22`, color: f.color }}>
                    <f.icon size={18} />
                  </div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            <div className="auth-brand-footer">
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                Ministry of Ayush & AICTE Co-Aligned • Smart India Hackathon 2026
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            {/* Mobile Logo */}
            <div className="auth-mobile-logo">
              <Sparkles size={22} style={{ color: 'var(--primary-light)' }} />
              <span className="text-gradient-primary" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.3rem' }}>
                EduBridge AI
              </span>
            </div>

            <div className="auth-form-header">
              <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
              <p>{isRegister ? 'Join the platform as a' : 'Sign in to continue as'}</p>
            </div>

            {/* Role Selector */}
            <div className="auth-role-grid">
              {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  className={`auth-role-card ${selectedRole === key ? 'active' : ''}`}
                  onClick={() => setSelectedRole(key)}
                  style={{
                    '--role-color': config.color,
                    '--role-gradient': config.gradient
                  }}
                >
                  <config.icon size={20} />
                  <span>{config.label}</span>
                </button>
              ))}
            </div>

            <p className="auth-role-desc">
              <roleConfig.icon size={14} style={{ color: roleConfig.color }} />
              {roleConfig.desc}
            </p>

            {/* Admin Credentials Hint */}
            {selectedRole === 'admin' && (
              <div className="auth-admin-hint">
                <Shield size={14} />
                <div>
                  <strong>Default Admin Credentials</strong>
                  <br />
                  Email: <code>admin@edubridge.gov.in</code>
                  <br />
                  Password: <code>admin123</code>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Aryan Sharma"
                    className="form-input auth-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={selectedRole === 'admin' ? 'admin@edubridge.gov.in' : 'you@college.edu.in'}
                  className="form-input auth-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="auth-password-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="form-input auth-input"
                    required
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {isRegister && selectedRole !== 'admin' && (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      {selectedRole === 'industry' ? 'Company Name' : selectedRole === 'academia' ? 'Institution Name' : 'College / University'}
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      placeholder={selectedRole === 'industry' ? 'TCS, Infosys...' : 'IIT Delhi, NIT Trichy...'}
                      className="form-input auth-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="form-input auth-input"
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary auth-submit-btn"
                disabled={loading}
                style={{ background: roleConfig.gradient }}
              >
                {loading ? (
                  <div className="auth-spinner" />
                ) : (
                  <>
                    {isRegister ? (
                      <>Create Account <ArrowRight size={16} /></>
                    ) : (
                      <>Sign In <LogIn size={16} /></>
                    )}
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* SSO Options */}
            <div className="auth-sso-row">
              <button className="auth-sso-btn" type="button" onClick={() => {
                setLoading(true);
                setTimeout(() => onLogin({ role: selectedRole === 'admin' ? 'national' : selectedRole, user: { name: 'DigiLocker User', email: 'user@digilocker.gov.in' } }), 1000);
              }}>
                <Fingerprint size={18} />
                DigiLocker SSO
              </button>
              <button className="auth-sso-btn" type="button" onClick={() => {
                setLoading(true);
                setTimeout(() => onLogin({ role: selectedRole === 'admin' ? 'national' : selectedRole, user: { name: 'ABC User', email: 'user@abc.gov.in' } }), 1000);
              }}>
                <Globe2 size={18} />
                ABC ID Login
              </button>
            </div>

            {/* Toggle Register/Login */}
            <div className="auth-toggle-row">
              <p>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  className="auth-toggle-btn"
                  onClick={() => { setIsRegister(!isRegister); setError(''); }}
                >
                  {isRegister ? 'Sign In' : 'Register Now'}
                  <ChevronRight size={14} />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
