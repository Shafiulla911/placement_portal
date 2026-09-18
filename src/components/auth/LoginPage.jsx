import React, { useState, useEffect } from 'react';
import {
  LogIn,
  Eye,
  EyeOff,
  Shield,
  GraduationCap,
  Building2,
  School,
  Globe2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Fingerprint,
  Zap,
  BookOpen,
  Users,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  X,
  Smartphone,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

const ROLE_KEYS = ['student', 'industry', 'academia', 'admin'];

const ROLE_THEMES = {
  student: {
    icon: GraduationCap,
    label: 'Student',
    tagline: 'Student & Graduate Portal',
    color: '#818cf8',
    colorLight: '#c7d2fe',
    accentColor: '#6366f1',
    gradient: 'linear-gradient(135deg, #4f46e5, #818cf8)',
    desc: 'Access skill mapping, internships & career tools',
    badgeText: 'Student Portal • NEP 2020',
    headline: 'Portal for Academia–Industry Collaboration',
    subtitle: 'Bridging the gap between education and employment through AI-powered skill mapping, internships, and placement solutions aligned with NEP 2020.',
    footerText: 'Ministry of Ayush & AICTE Co-Aligned • Smart India Hackathon 2026',
    brandPanelBg: 'linear-gradient(155deg, #0c1229 0%, #111b3a 50%, #0a1020 100%)',
    brandGlow1: 'rgba(99, 102, 241, 0.22)',
    brandGlow2: 'rgba(139, 92, 246, 0.15)',
    orb1: 'radial-gradient(circle, rgba(99, 102, 241, 0.30) 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(139, 92, 246, 0.26) 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(129, 140, 248, 0.22) 0%, transparent 70%)',
    orb4: 'radial-gradient(circle, rgba(167, 139, 250, 0.24) 0%, transparent 70%)',
    orb5: 'radial-gradient(circle, rgba(79, 70, 229, 0.22) 0%, transparent 70%)',
    orb6: 'radial-gradient(circle, rgba(199, 210, 254, 0.18) 0%, transparent 70%)',
    containerGlow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(99, 102, 241, 0.25)',
    borderColor: 'rgba(99, 102, 241, 0.35)',
    logoGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6, #818cf8)',
    logoShadow: '0 8px 24px rgba(99, 102, 241, 0.5)',
    badgeBg: 'rgba(99, 102, 241, 0.18)',
    badgeColor: '#c7d2fe',
    badgeBorder: 'rgba(99, 102, 241, 0.35)',
    gridColor: 'rgba(99, 102, 241, 0.05)',
    features: [
      { icon: BrainCircuit, text: 'AI-Powered Skill Gap Analysis', color: '#818cf8' },
      { icon: BookOpen, text: 'NEP 2020 Aligned Academic Credit Locker', color: '#a5b4fc' },
      { icon: Users, text: 'Verified Mentorship & Industry Matching', color: '#818cf8' },
      { icon: BarChart3, text: 'Adaptive Technical Competency Assessments', color: '#c7d2fe' }
    ]
  },
  industry: {
    icon: Building2,
    label: 'Industry',
    tagline: 'Enterprise Talent & Innovation Network',
    color: '#06b6d4',
    colorLight: '#a5f3fc',
    accentColor: '#0891b2',
    gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)',
    desc: 'Post opportunities, search talent & capstone projects',
    badgeText: 'Industry Partner Portal',
    headline: 'Enterprise Talent & Opportunity Network',
    subtitle: 'Discover pre-assessed talent, sponsor R&D capstones, and connect with premier academic institutions across India.',
    footerText: 'Corporate Recruitment & Ayush Healthtech Innovation Engine',
    brandPanelBg: 'linear-gradient(155deg, #041922 0%, #082d3b 50%, #02141c 100%)',
    brandGlow1: 'rgba(6, 182, 212, 0.25)',
    brandGlow2: 'rgba(14, 165, 233, 0.18)',
    orb1: 'radial-gradient(circle, rgba(6, 182, 212, 0.32) 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(8, 145, 178, 0.28) 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(56, 189, 248, 0.24) 0%, transparent 70%)',
    orb4: 'radial-gradient(circle, rgba(2, 132, 199, 0.24) 0%, transparent 70%)',
    orb5: 'radial-gradient(circle, rgba(14, 116, 144, 0.22) 0%, transparent 70%)',
    orb6: 'radial-gradient(circle, rgba(165, 243, 252, 0.18) 0%, transparent 70%)',
    containerGlow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(6, 182, 212, 0.3)',
    borderColor: 'rgba(6, 182, 212, 0.4)',
    logoGradient: 'linear-gradient(135deg, #0891b2, #06b6d4, #38bdf8)',
    logoShadow: '0 8px 24px rgba(6, 182, 212, 0.55)',
    badgeBg: 'rgba(6, 182, 212, 0.18)',
    badgeColor: '#a5f3fc',
    badgeBorder: 'rgba(6, 182, 212, 0.4)',
    gridColor: 'rgba(6, 182, 212, 0.05)',
    features: [
      { icon: Users, text: 'Targeted Candidate & Verified Skill Search', color: '#06b6d4' },
      { icon: Zap, text: '1-Click Internship & Job Postings', color: '#38bdf8' },
      { icon: BrainCircuit, text: 'Industry Capstone Project Sponsorship', color: '#06b6d4' },
      { icon: BarChart3, text: 'Campus Talent Pipeline & Hiring Analytics', color: '#a5f3fc' }
    ]
  },
  academia: {
    icon: School,
    label: 'Academia',
    tagline: 'Higher Education & Curriculum Co-Alignment',
    color: '#10b981',
    colorLight: '#a7f3d0',
    accentColor: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    desc: 'Curriculum alignment, MoU management & analytics',
    badgeText: 'Institutional & TPO Portal',
    headline: 'Institutional Excellence & Curriculum Alignment',
    subtitle: 'Sync higher-ed syllabi with real-time industry demands, manage corporate MoUs, and track student placement outcomes.',
    footerText: 'National Higher Education Qualification Framework (NHEQF)',
    brandPanelBg: 'linear-gradient(155deg, #021a13 0%, #052f23 50%, #01130d 100%)',
    brandGlow1: 'rgba(16, 185, 129, 0.25)',
    brandGlow2: 'rgba(52, 211, 153, 0.18)',
    orb1: 'radial-gradient(circle, rgba(16, 185, 129, 0.32) 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(5, 150, 105, 0.28) 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(52, 211, 153, 0.24) 0%, transparent 70%)',
    orb4: 'radial-gradient(circle, rgba(4, 120, 87, 0.24) 0%, transparent 70%)',
    orb5: 'radial-gradient(circle, rgba(6, 95, 70, 0.22) 0%, transparent 70%)',
    orb6: 'radial-gradient(circle, rgba(167, 243, 208, 0.18) 0%, transparent 70%)',
    containerGlow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 185, 129, 0.3)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    logoGradient: 'linear-gradient(135deg, #059669, #10b981, #34d399)',
    logoShadow: '0 8px 24px rgba(16, 185, 129, 0.55)',
    badgeBg: 'rgba(16, 185, 129, 0.18)',
    badgeColor: '#a7f3d0',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    gridColor: 'rgba(16, 185, 129, 0.05)',
    features: [
      { icon: BookOpen, text: 'AI Curriculum Mapping & Skill Demand Match', color: '#10b981' },
      { icon: Shield, text: 'Institutional MoU & Industry Partnerships', color: '#34d399' },
      { icon: Users, text: 'Student Cohort & NEP Credit Management', color: '#10b981' },
      { icon: BarChart3, text: 'Accreditation Readiness & Placement Metrics', color: '#a7f3d0' }
    ]
  },
  admin: {
    icon: Shield,
    label: 'Admin',
    tagline: 'Apex National Skill & Governance Directorate',
    color: '#f59e0b',
    colorLight: '#fde68a',
    accentColor: '#d97706',
    gradient: 'linear-gradient(135deg, #d97706, #f59e0b)',
    desc: 'Full platform control & national oversight',
    badgeText: 'National Apex & Ministry Directorate',
    headline: 'National Apex Skill Governance & Analytics',
    subtitle: 'Macro-level district heatmaps, policy tracking, inter-state talent mobility, and comprehensive platform administration.',
    footerText: 'District Level Demonstration • Ministry of Ayush & AICTE Co-Alignment',
    brandPanelBg: 'linear-gradient(155deg, #1f1202 0%, #361f06 50%, #130a01 100%)',
    brandGlow1: 'rgba(245, 158, 11, 0.25)',
    brandGlow2: 'rgba(251, 191, 36, 0.18)',
    orb1: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, rgba(217, 119, 6, 0.28) 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, rgba(251, 191, 36, 0.24) 0%, transparent 70%)',
    orb4: 'radial-gradient(circle, rgba(180, 83, 9, 0.24) 0%, transparent 70%)',
    orb5: 'radial-gradient(circle, rgba(146, 64, 14, 0.22) 0%, transparent 70%)',
    orb6: 'radial-gradient(circle, rgba(253, 230, 138, 0.18) 0%, transparent 70%)',
    containerGlow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(245, 158, 11, 0.3)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    logoGradient: 'linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)',
    logoShadow: '0 8px 24px rgba(245, 158, 11, 0.55)',
    badgeBg: 'rgba(245, 158, 11, 0.18)',
    badgeColor: '#fde68a',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    gridColor: 'rgba(245, 158, 11, 0.05)',
    features: [
      { icon: BarChart3, text: 'National Skill Heatmaps & District Analytics', color: '#f59e0b' },
      { icon: Shield, text: 'Apex Verification & Governance Directorate', color: '#fbbf24' },
      { icon: Globe2, text: 'Ministry of Ayush & AICTE Co-Alignment', color: '#f59e0b' },
      { icon: BrainCircuit, text: 'Cross-State Talent Redistribution AI Engine', color: '#fde68a' }
    ]
  }
};

const BACKGROUND_POPPABLES = {
  student: [
    { id: 's1', emoji: '🎓', label: 'Dream Placement', reward: '🎓 Dream Job Unlocked! +100 Skill XP', top: '10%', duration: '34s', delay: '-3s' },
    { id: 's2', emoji: '☕', label: 'Hackathon Coffee', reward: '☕ 2 AM Fuel! +50 Focus & Caffeine', top: '24%', duration: '40s', delay: '-14s' },
    { id: 's3', emoji: '💻', label: 'Git Push Main', reward: '💻 Clean Build! 0 Bugs & Fast Deploy', top: '48%', duration: '32s', delay: '-8s' },
    { id: 's4', emoji: '📚', label: 'NEP Credit Locker', reward: '📚 +4 NEP Academic Credits Earned!', top: '68%', duration: '38s', delay: '-20s' },
    { id: 's5', emoji: '🍕', label: 'Midnight Pizza', reward: '🍕 Midnight Hackathon Snack Refilled!', top: '84%', duration: '44s', delay: '-26s' },
    { id: 's6', emoji: '🚀', label: 'Campus Drive', reward: '🚀 Top Tier MNC Application Shortlisted!', top: '36%', duration: '36s', delay: '-17s' }
  ],
  industry: [
    { id: 'i1', emoji: '💼', label: 'Job Offer', reward: '💼 ₹28 LPA Full-Time Package Dispatched!', top: '12%', duration: '34s', delay: '-4s' },
    { id: 'i2', emoji: '🚀', label: 'Unicorn Startup', reward: '🚀 $1B Tech Unicorn Status Unlocked!', top: '28%', duration: '40s', delay: '-15s' },
    { id: 'i3', emoji: '📈', label: 'Bull Market', reward: '📈 +140% Talent Pipeline Growth!', top: '52%', duration: '32s', delay: '-9s' },
    { id: 'i4', emoji: '🏢', label: 'Tech Park HQ', reward: '🏢 New Innovation Campus R&D Lab Open!', top: '72%', duration: '42s', delay: '-22s' },
    { id: 'i5', emoji: '🤝', label: 'Corporate MoU', reward: '🤝 Strategic Ayush Tech Partnership Signed!', top: '86%', duration: '36s', delay: '-28s' },
    { id: 'i6', emoji: '💰', label: 'Sign-On Bonus', reward: '💰 Top Performer Retention Bonus Approved!', top: '38%', duration: '38s', delay: '-18s' }
  ],
  academia: [
    { id: 'a1', emoji: '📚', label: 'Curriculum Syllabi', reward: '📚 AICTE & Ayush Model Syllabus Aligned!', top: '10%', duration: '35s', delay: '-5s' },
    { id: 'a2', emoji: '🏛️', label: 'Campus NAAC A++', reward: '🏛️ NAAC A++ Institutional Rating Sustained!', top: '26%', duration: '41s', delay: '-16s' },
    { id: 'a3', emoji: '🔬', label: 'Botanical AI', reward: '🔬 Phytochemical Compound Successfully Target-Mapped!', top: '48%', duration: '33s', delay: '-10s' },
    { id: 'a4', emoji: '📜', label: 'NEP Degree', reward: '📜 138 Academic Credits Verified in NAD ABC!', top: '66%', duration: '39s', delay: '-23s' },
    { id: 'a5', emoji: '🔔', label: 'Campus Bell', reward: '🔔 Class in session! 100% Student Attendance.', top: '82%', duration: '45s', delay: '-29s' },
    { id: 'a6', emoji: '🎓', label: 'Dean Honor Roll', reward: '🎓 100% Cohort Campus Placement Milestone!', top: '40%', duration: '37s', delay: '-19s' }
  ],
  admin: [
    { id: 'ad1', emoji: '🛡️', label: 'Apex Shield', reward: '🛡️ National Skill Registry Firewall Verified!', top: '12%', duration: '34s', delay: '-3s' },
    { id: 'ad2', emoji: '🔨', label: 'National Gavel', reward: '🔨 Order in the Directorate! Policy Passed.', top: '25%', duration: '40s', delay: '-14s' },
    { id: 'ad3', emoji: '👑', label: 'Innovation Crown', reward: '👑 District Evaluation: Ranked #1 Portal!', top: '50%', duration: '32s', delay: '-8s' },
    { id: 'ad4', emoji: '🚨', label: 'Talent Dispatch', reward: '🚨 500 AI Engineers Allocated to Labs!', top: '70%', duration: '38s', delay: '-20s' },
    { id: 'ad5', emoji: '🌐', label: '28 States Grid', reward: '🌐 Inter-State Talent Mobility Live!', top: '84%', duration: '44s', delay: '-26s' },
    { id: 'ad6', emoji: '⚡', label: 'Apex Directive', reward: '⚡ National Skill Council Interoperability Synchronized!', top: '38%', duration: '36s', delay: '-17s' }
  ]
};

export const LoginPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    phone: ''
  });

  // ─── Auto Role Slideshow (when form is collapsed behind) ───────────
  useEffect(() => {
    if (isFormOpen) return;
    const timer = setInterval(() => {
      setSelectedRole((prevRole) => {
        const nextIndex = (ROLE_KEYS.indexOf(prevRole) + 1) % ROLE_KEYS.length;
        return ROLE_KEYS[nextIndex];
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isFormOpen]);

  // ─── SSO Modals State ──────────────────────────────
  const [digiLockerModalOpen, setDigiLockerModalOpen] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('idle'); // 'idle' | 'scanning' | 'success'
  const [biometricStatusText, setBiometricStatusText] = useState('Place your finger on the sensor to scan biometrics');

  const [abcModalOpen, setAbcModalOpen] = useState(false);
  const [abcStep, setAbcStep] = useState('enter_id'); // 'enter_id' | 'enter_otp' | 'verified'
  const [aadhaarInput, setAadhaarInput] = useState('8472 9103 4419');
  const [otpInput, setOtpInput] = useState('');
  const [abcError, setAbcError] = useState('');
  const [abcLoading, setAbcLoading] = useState(false);

  // ─── Floating Left-to-Right Poppables State ───────
  const [poppedItems, setPoppedItems] = useState({});
  const [popToast, setPopToast] = useState(null);

  const currentTheme = ROLE_THEMES[selectedRole];
  const CurrentRoleIcon = currentTheme.icon;

  const handlePopItem = (item) => {
    if (poppedItems[item.id]) return;
    setPoppedItems(prev => ({ ...prev, [item.id]: true }));
    setPopToast({ emoji: item.emoji, label: item.label, reward: item.reward, color: currentTheme.color });

    setTimeout(() => {
      setPopToast(null);
    }, 2800);

    // Respawn after 3.5s
    setTimeout(() => {
      setPoppedItems(prev => ({ ...prev, [item.id]: false }));
    }, 3500);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
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

    const endpoint = isRegister ? 'http://localhost:5000/api/auth/register' : 'http://localhost:5000/api/auth/login';
    const payload = isRegister
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole === 'admin' ? 'admin' : selectedRole,
          college: formData.college,
          phone: formData.phone
        }
      : {
          email: formData.email,
          password: formData.password,
          role: selectedRole === 'admin' ? 'national' : selectedRole
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      const effectiveRole = data.user.role === 'admin' ? 'national' : (data.user.role || (selectedRole === 'admin' ? 'national' : selectedRole));

      onLogin({
        role: effectiveRole,
        user: data.user
      });
      setLoading(false);
    } catch (err) {
      // Fallback check for demo accounts if offline/local
      if (!isRegister) {
        if (
          (selectedRole === 'admin' && formData.email === 'admin@edubridge.gov.in' && formData.password === 'admin123') ||
          (formData.email === 'admin459@sanjaygandhi.com' && formData.password === 'Admin@459')
        ) {
          onLogin({
            role: 'national',
            user: { name: 'Apex Admin', email: formData.email, isAdmin: true }
          });
          setLoading(false);
          return;
        } else if (formData.email && formData.password) {
          onLogin({
            role: selectedRole === 'admin' ? 'national' : selectedRole,
            user: {
              name: formData.name || formData.email.split('@')[0],
              email: formData.email,
              isAdmin: selectedRole === 'admin'
            }
          });
          setLoading(false);
          return;
        }
      }
      setError(err.message || 'An error occurred during authentication.');
      setLoading(false);
    }
  };

  // ─── Biometric / Fingerprint Scan Handler ─────────
  const handleStartBiometricScan = () => {
    if (biometricStatus === 'scanning' || biometricStatus === 'success') return;
    setBiometricStatus('scanning');
    setBiometricStatusText('Scanning optical ridge patterns & minutiae points...');

    setTimeout(() => {
      setBiometricStatusText('Validating with UIDAI Aadhaar Vault...');
    }, 1200);

    setTimeout(() => {
      setBiometricStatus('success');
      setBiometricStatusText('Fingerprint Match Confirmed (99.8%)! Authenticated via DigiLocker.');

      setTimeout(() => {
        setDigiLockerModalOpen(false);
        onLogin({
          role: selectedRole === 'admin' ? 'national' : selectedRole,
          user: {
            name: selectedRole === 'student' ? 'Aryan Sharma' : selectedRole === 'industry' ? 'Suresh Narayanan' : selectedRole === 'academia' ? 'Prof. Radhika Rao' : 'Apex Administrator',
            email: 'aryan.sharma@digilocker.gov.in',
            isDigiLockerVerified: true
          }
        });
      }, 1400);
    }, 2400);
  };

  // ─── ABC ID / Aadhaar Flow Handlers ───────────────
  const handleGenerateAadhaarOtp = (e) => {
    e.preventDefault();
    if (!aadhaarInput.trim() || aadhaarInput.replace(/\s/g, '').length < 12) {
      setAbcError('Please enter a valid 12-digit Aadhaar / APAAR ID');
      return;
    }
    setAbcError('');
    setAbcLoading(true);

    setTimeout(() => {
      setAbcLoading(false);
      setAbcStep('enter_otp');
      setOtpInput('654321'); // Pre-fill test OTP for seamless testing
    }, 1000);
  };

  const handleVerifyAadhaarOtp = (e) => {
    e.preventDefault();
    if (!otpInput || otpInput.trim().length < 6) {
      setAbcError('Please enter the 6-digit verification OTP');
      return;
    }
    setAbcError('');
    setAbcLoading(true);

    setTimeout(() => {
      setAbcLoading(false);
      setAbcStep('verified');

      setTimeout(() => {
        setAbcModalOpen(false);
        onLogin({
          role: selectedRole === 'admin' ? 'national' : selectedRole,
          user: {
            name: selectedRole === 'student' ? 'Aryan Sharma' : selectedRole === 'industry' ? 'Suresh Narayanan' : selectedRole === 'academia' ? 'Prof. Radhika Rao' : 'Apex Administrator',
            email: 'aryan.abc2026@nad.gov.in',
            abcId: 'ABC-2026-9941-8821',
            isAbcVerified: true
          }
        });
      }, 1500);
    }, 1200);
  };

  return (
    <div className="auth-page">
      {/* Animated Role-Responsive Background with 4 Hardware-Accelerated Floating Orbs */}
      <div className="auth-bg-effects">
        <div
          className="auth-orb auth-orb-1"
          style={{ background: currentTheme.orb1 }}
        />
        <div
          className="auth-orb auth-orb-2"
          style={{ background: currentTheme.orb2 }}
        />
        <div
          className="auth-orb auth-orb-3"
          style={{ background: currentTheme.orb3 }}
        />
        <div
          className="auth-orb auth-orb-4"
          style={{ background: currentTheme.orb4 }}
        />
        <div
          className="auth-grid-lines"
          style={{
            backgroundImage: `
              linear-gradient(${currentTheme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${currentTheme.gridColor} 1px, transparent 1px)
            `
          }}
        />
      </div>

      {/* Interactive Floating Poppable Background Objects (Drifting Left to Right) */}
      <div className={`floating-poppables-layer ${!isFormOpen ? 'paused' : ''}`}>
        {(BACKGROUND_POPPABLES[selectedRole] || []).map((item) => {
          const isPopped = poppedItems[item.id];
          return (
            <div
              key={item.id}
              className={`floating-pop-item ${isPopped ? 'popping' : ''}`}
              onClick={() => handlePopItem(item)}
              title={`Tap to pop ${item.label}!`}
              style={{
                top: item.top,
                animationDuration: item.duration,
                animationDelay: item.delay,
                borderColor: `${currentTheme.color}55`,
                boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 20px ${currentTheme.color}33`,
                opacity: isPopped ? 0 : 0.92
              }}
            >
              <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{item.emoji}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  background: `${currentTheme.color}33`,
                  color: currentTheme.colorLight,
                  fontWeight: 800
                }}
              >
                POP ME ✨
              </span>
            </div>
          );
        })}
      </div>

      {/* Floating Pop Celebration Banner */}
      {popToast && (
        <div
          className="pop-reward-banner"
          style={{
            borderColor: popToast.color,
            boxShadow: `0 15px 40px rgba(0, 0, 0, 0.9), 0 0 35px ${popToast.color}66`
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>💥 {popToast.emoji}</span>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Bubble Popped!
            </div>
            <div style={{ color: '#ffffff', fontWeight: 800 }}>{popToast.reward}</div>
          </div>
        </div>
      )}

      <div
        className={`auth-container ${!isFormOpen ? 'collapsed' : ''}`}
        style={{
          boxShadow: currentTheme.containerGlow,
          borderColor: currentTheme.borderColor
        }}
      >
        {/* Left Panel - Dynamic Themed Branding */}
        <div
          className="auth-brand-panel"
          style={{
            background: currentTheme.brandPanelBg,
            borderColor: currentTheme.borderColor
          }}
        >
          {/* Panel Accent Glows */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 20% 30%, ${currentTheme.brandGlow1} 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, ${currentTheme.brandGlow2} 0%, transparent 50%)
              `,
              pointerEvents: 'none',
              transition: 'background 0.5s ease'
            }}
          />

          <div key={selectedRole} className="auth-brand-content">
            {/* Logo Row */}
            <div className="auth-logo-row">
              <div
                className="auth-logo-icon"
                style={{
                  background: currentTheme.logoGradient,
                  boxShadow: currentTheme.logoShadow
                }}
              >
                <CurrentRoleIcon size={26} color="#ffffff" />
              </div>
              <div>
                <h1 className="auth-brand-title">EduBridge AI</h1>
                <span
                  className="badge"
                  style={{
                    fontSize: '0.72rem',
                    background: currentTheme.badgeBg,
                    color: currentTheme.badgeColor,
                    borderColor: currentTheme.badgeBorder,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.4s ease'
                  }}
                >
                  <Zap size={11} /> {currentTheme.badgeText}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="auth-brand-headline">
              {currentTheme.headline}
            </h2>

            {/* Subtitle */}
            <p className="auth-brand-sub">
              {currentTheme.subtitle}
            </p>

            {/* Role Features List */}
            <div className="auth-features-list">
              {currentTheme.features.map((f, i) => (
                <div
                  key={i}
                  className="auth-feature-item"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <div
                    className="auth-feature-icon"
                    style={{
                      background: `${f.color}22`,
                      color: f.color,
                      border: `1px solid ${f.color}44`,
                      transition: 'all 0.4s ease'
                    }}
                  >
                    <f.icon size={18} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Brand Footer */}
            <div
              className="auth-brand-footer"
              style={{ borderColor: currentTheme.borderColor }}
            >
              <div className="auth-brand-footer-top">
                {/* Role Slideshow Indicators */}
                <div className="brand-slideshow-indicators">
                  {ROLE_KEYS.map((rKey) => (
                    <button
                      key={rKey}
                      type="button"
                      className={`slideshow-dot ${selectedRole === rKey ? 'active' : ''}`}
                      onClick={() => setSelectedRole(rKey)}
                      style={{
                        background: selectedRole === rKey ? currentTheme.color : 'rgba(255, 255, 255, 0.25)',
                        boxShadow: selectedRole === rKey ? `0 0 10px ${currentTheme.color}` : 'none'
                      }}
                      title={`Preview ${ROLE_THEMES[rKey].label}`}
                    />
                  ))}
                </div>

                {/* Login Trigger Button when collapsed */}
                {!isFormOpen && (
                  <button
                    type="button"
                    className="btn-brand-login-trigger"
                    onClick={() => {
                      setSelectedRole('student');
                      setIsFormOpen(true);
                    }}
                    style={{
                      background: currentTheme.gradient,
                      boxShadow: `0 6px 24px ${currentTheme.color}55`,
                      border: `1px solid ${currentTheme.colorLight}44`
                    }}
                  >
                    <span>Log In / Sign Up</span>
                    <ArrowRight size={17} className="brand-btn-arrow" />
                  </button>
                )}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                {currentTheme.footerText}
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            {/* Top Bar with Back Button */}
            <div className="auth-form-top-bar">
              <div
                className="auth-form-top-pill"
                style={{
                  color: currentTheme.colorLight,
                  background: `${currentTheme.color}18`,
                  border: `1px solid ${currentTheme.color}33`
                }}
              >
                <Zap size={13} style={{ color: currentTheme.color }} />
                <span>{currentTheme.label} Portal Access</span>
              </div>

              <button
                type="button"
                className="auth-back-btn"
                onClick={() => setIsFormOpen(false)}
                title="Hide form and back to overview"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            </div>
            {/* Mobile Logo */}
            <div className="auth-mobile-logo">
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: currentTheme.logoGradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: currentTheme.logoShadow
                }}
              >
                <CurrentRoleIcon size={18} color="#ffffff" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.3rem',
                  color: '#ffffff'
                }}
              >
                EduBridge AI
              </span>
            </div>

            <div className="auth-form-header">
              <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
              <p>{isRegister ? `Join the platform as a ${currentTheme.label}` : `Sign in to continue as ${currentTheme.label}`}</p>
            </div>

            {/* Role Selector */}
            <div className="auth-role-grid">
              {Object.entries(ROLE_THEMES).map(([key, config]) => {
                const Icon = config.icon;
                const isActive = selectedRole === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`auth-role-card ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedRole(key);
                      setError('');
                    }}
                    style={{
                      '--role-color': config.color,
                      '--role-gradient': config.gradient,
                      borderColor: isActive ? config.color : undefined,
                      boxShadow: isActive ? `0 4px 18px ${config.color}44` : undefined
                    }}
                  >
                    <Icon size={20} />
                    <span>{config.label}</span>
                  </button>
                );
              })}
            </div>

            <p
              className="auth-role-desc"
              style={{
                borderColor: `${currentTheme.color}33`,
                background: `${currentTheme.color}0a`
              }}
            >
              <CurrentRoleIcon size={14} style={{ color: currentTheme.color }} />
              <span>{currentTheme.desc}</span>
            </p>

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
                  placeholder={
                    selectedRole === 'student'
                      ? 'aryan.sharma@college.edu.in'
                      : selectedRole === 'industry'
                        ? 'recruitment@apollo-tech.com'
                        : selectedRole === 'academia'
                          ? 'tpo@university.ac.in'
                          : 'admin@institution.gov.in'
                  }
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
                      placeholder={selectedRole === 'industry' ? 'Apollo Healthcare, TCS...' : 'IIT Delhi, NIT Trichy...'}
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
                style={{
                  background: currentTheme.gradient,
                  boxShadow: `0 4px 20px ${currentTheme.color}55`
                }}
              >
                {loading ? (
                  <div className="auth-spinner" />
                ) : (
                  <>
                    {isRegister ? (
                      <>Create Account <ArrowRight size={16} /></>
                    ) : (
                      <>Sign In as {currentTheme.label} <LogIn size={16} /></>
                    )}
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>or authenticate via</span>
            </div>

            {/* SSO Interactive Buttons */}
            <div className="auth-sso-row">
              <button
                className="auth-sso-btn"
                type="button"
                onClick={() => {
                  setBiometricStatus('idle');
                  setBiometricStatusText('Place your finger on the sensor to scan biometrics');
                  setDigiLockerModalOpen(true);
                }}
              >
                <Fingerprint size={18} style={{ color: currentTheme.color }} />
                DigiLocker SSO
              </button>
              <button
                className="auth-sso-btn"
                type="button"
                onClick={() => {
                  setAbcStep('enter_id');
                  setAbcError('');
                  setAbcModalOpen(true);
                }}
              >
                <Globe2 size={18} style={{ color: currentTheme.color }} />
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
                  style={{ color: currentTheme.color }}
                >
                  {isRegister ? 'Sign In' : 'Register Now'}
                  <ChevronRight size={14} />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          MODAL 1: DIGILOCKER BIOMETRIC FINGERPRINT SCAN
          ═══════════════════════════════════════════════════ */}
      {digiLockerModalOpen && (
        <div className="sso-modal-overlay">
          <div className="sso-modal-card">
            {/* Header */}
            <div className="sso-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Fingerprint size={18} color="#818cf8" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>DigiLocker Biometric Authentication</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MeitY • National Digital Locker System</div>
                </div>
              </div>
              <button
                onClick={() => setDigiLockerModalOpen(false)}
                className="navbar-icon-btn"
                style={{ width: '28px', height: '28px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="sso-modal-body" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Please place your enrolled fingerprint on the scanner below to verify your digital identity.
              </p>

              {/* Interactive Biometric Touchpad */}
              <div
                className={`biometric-scanner-pad ${biometricStatus}`}
                onClick={handleStartBiometricScan}
              >
                <Fingerprint
                  size={70}
                  color={
                    biometricStatus === 'success'
                      ? '#10b981'
                      : biometricStatus === 'scanning'
                        ? '#06b6d4'
                        : '#818cf8'
                  }
                />
                {biometricStatus === 'scanning' && <div className="laser-scanner-bar" />}
              </div>

              {/* Status Indicator */}
              <div style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: biometricStatus === 'success' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: biometricStatus === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
                fontSize: '0.84rem',
                color: biometricStatus === 'success' ? '#6ee7b7' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                {biometricStatus === 'success' ? (
                  <CheckCircle2 size={16} color="#10b981" />
                ) : biometricStatus === 'scanning' ? (
                  <div className="auth-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                ) : (
                  <ShieldCheck size={16} color="#818cf8" />
                )}
                <span>{biometricStatusText}</span>
              </div>

              {/* Action Button */}
              {biometricStatus === 'idle' && (
                <button
                  type="button"
                  onClick={handleStartBiometricScan}
                  className="btn btn-primary"
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Fingerprint size={16} /> Tap to Scan Fingerprint
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          MODAL 2: ABC ID / AADHAAR OTP VERIFICATION
          ═══════════════════════════════════════════════════ */}
      {abcModalOpen && (
        <div className="sso-modal-overlay">
          <div className="sso-modal-card">
            {/* Header */}
            <div className="sso-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe2 size={18} color="#06b6d4" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>Academic Bank of Credits (ABC)</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>National Academic Depository (NAD) & Aadhaar e-KYC</div>
                </div>
              </div>
              <button
                onClick={() => setAbcModalOpen(false)}
                className="navbar-icon-btn"
                style={{ width: '28px', height: '28px' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="sso-modal-body">
              {abcStep === 'enter_id' && (
                <form onSubmit={handleGenerateAadhaarOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="aadhaar-preview-card">
                    <div className="aadhaar-card-stripe" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
                        GOVERNMENT OF INDIA • UNIQUE IDENTIFICATION
                      </span>
                      <ShieldCheck size={14} color="#06b6d4" />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Enter your 12-digit Aadhaar / APAAR / ABC ID to fetch your academic credit repository.
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">12-Digit Aadhaar / APAAR / ABC ID</label>
                    <input
                      type="text"
                      value={aadhaarInput}
                      onChange={(e) => {
                        setAadhaarInput(e.target.value);
                        setAbcError('');
                      }}
                      placeholder="8472 9103 4419"
                      maxLength={14}
                      className="form-input auth-input"
                      style={{ fontSize: '1.05rem', letterSpacing: '0.08em', fontWeight: 600, color: '#ffffff' }}
                      required
                    />
                  </div>

                  {abcError && (
                    <div className="auth-error" style={{ marginBottom: 0 }}>
                      {abcError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={abcLoading}
                    style={{ width: '100%', background: 'linear-gradient(135deg, #0891b2, #06b6d4)', gap: '8px' }}
                  >
                    {abcLoading ? (
                      <div className="auth-spinner" />
                    ) : (
                      <>
                        <Smartphone size={16} /> Send Aadhaar OTP to Linked Mobile
                      </>
                    )}
                  </button>
                </form>
              )}

              {abcStep === 'enter_otp' && (
                <form onSubmit={handleVerifyAadhaarOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.15)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Smartphone size={24} color="#06b6d4" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                      Enter Verification Code
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      A 6-digit OTP has been sent to Aadhaar-linked mobile: <strong style={{ color: '#ffffff' }}>+91 ******4521</strong>
                    </p>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">6-Digit OTP</label>
                    <input
                      type="text"
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value);
                        setAbcError('');
                      }}
                      placeholder="654321"
                      maxLength={6}
                      className="form-input auth-input"
                      style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '0.25em', fontWeight: 700, color: '#06b6d4' }}
                      required
                    />
                  </div>

                  {abcError && (
                    <div className="auth-error" style={{ marginBottom: 0 }}>
                      {abcError}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setAbcStep('enter_id')}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <RotateCcw size={14} /> Change ID
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={abcLoading}
                      style={{ flex: 2, background: 'linear-gradient(135deg, #059669, #10b981)', gap: '8px' }}
                    >
                      {abcLoading ? (
                        <div className="auth-spinner" />
                      ) : (
                        <>
                          <CheckCircle2 size={16} /> Verify & Log In
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {abcStep === 'verified' && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={32} color="#10b981" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                    Aadhaar e-KYC & ABC ID Verified!
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#a7f3d0', marginBottom: '14px' }}>
                    Linked Academic Bank of Credits: <strong>138 NEP Credits</strong>
                  </p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Redirecting to portal workspace...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
