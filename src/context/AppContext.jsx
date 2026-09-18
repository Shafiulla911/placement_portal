import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STUDENT,
  INITIAL_INTERNSHIPS,
  INITIAL_APPLICATIONS,
  TARGET_ROLE_BENCHMARKS,
  INDUSTRY_CANDIDATES,
  CAPSTONE_PROJECTS,
  ACADEMIA_ANALYTICS,
  NATIONAL_ANALYTICS,
  MENTORS_LIST
} from '../data/mockData';

const AppContext = createContext();
const API_BASE = 'http://localhost:5000/api';
const AUTH_STORAGE_KEY = 'edubridge_auth_session';

function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read auth session from storage:', e.message);
  }
  return null;
}

export const AppProvider = ({ children }) => {
  const initialAuth = getStoredAuth();

  // ─── Auth State (Persistent with localStorage) ─────
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(initialAuth && initialAuth.isLoggedIn));
  const [loggedInUser, setLoggedInUser] = useState(initialAuth?.user || null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Simulated Role
  const [currentRole, setCurrentRole] = useState(initialAuth?.role || 'student'); // 'student' | 'industry' | 'academia' | 'national'
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState(
    initialAuth?.activeTab || (initialAuth?.role === 'national' ? 'overview' : 'dashboard')
  );
  
  // Global Data State
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT);
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [candidates, setCandidates] = useState(INDUSTRY_CANDIDATES);
  const [capstoneList, setCapstoneList] = useState(CAPSTONE_PROJECTS);
  const [mousList, setMousList] = useState(ACADEMIA_ANALYTICS.activeMoUs);
  const [mentorsList, setMentorsList] = useState(MENTORS_LIST);
  const [selectedTargetRole, setSelectedTargetRole] = useState(TARGET_ROLE_BENCHMARKS[0]);
  const [dbStatus, setDbStatus] = useState({ connected: true, engine: 'MySQL 8.0' });
  
  // Toast Alert System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ─── Fetch Initial Data from MySQL Backend on Mount ──
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [healthRes, profRes, jobsRes, appsRes, candsRes, capsRes, mousRes, mentorsRes] = await Promise.allSettled([
          fetch(`${API_BASE}/health`).then(r => r.json()),
          fetch(`${API_BASE}/student/profile`).then(r => r.json()),
          fetch(`${API_BASE}/internships`).then(r => r.json()),
          fetch(`${API_BASE}/applications`).then(r => r.json()),
          fetch(`${API_BASE}/candidates`).then(r => r.json()),
          fetch(`${API_BASE}/capstones`).then(r => r.json()),
          fetch(`${API_BASE}/mous`).then(r => r.json()),
          fetch(`${API_BASE}/mentors`).then(r => r.json())
        ]);

        if (healthRes.status === 'fulfilled' && healthRes.value) {
          setDbStatus({
            connected: healthRes.value.mysqlConnected,
            engine: healthRes.value.engine
          });
        }
        if (profRes.status === 'fulfilled' && profRes.value && profRes.value.name) {
          setStudentProfile(profRes.value);
        }
        if (jobsRes.status === 'fulfilled' && Array.isArray(jobsRes.value) && jobsRes.value.length > 0) {
          setInternships(jobsRes.value);
        }
        if (appsRes.status === 'fulfilled' && Array.isArray(appsRes.value) && appsRes.value.length > 0) {
          setApplications(appsRes.value);
        }
        if (candsRes.status === 'fulfilled' && Array.isArray(candsRes.value) && candsRes.value.length > 0) {
          setCandidates(candsRes.value);
        }
        if (capsRes.status === 'fulfilled' && Array.isArray(capsRes.value) && capsRes.value.length > 0) {
          setCapstoneList(capsRes.value);
        }
        if (mousRes.status === 'fulfilled' && Array.isArray(mousRes.value) && mousRes.value.length > 0) {
          setMousList(mousRes.value);
        }
        if (mentorsRes.status === 'fulfilled' && Array.isArray(mentorsRes.value) && mentorsRes.value.length > 0) {
          setMentorsList(mentorsRes.value);
        }
      } catch (err) {
        console.warn('Backend API fetch notice (using local cache):', err.message);
      }
    };

    fetchInitialData();
  }, []);

  // ─── Auth Handlers (Persisted to localStorage) ────
  const handleLogin = ({ role, user }) => {
    const initialTab = role === 'national' ? 'overview' : 'dashboard';
    setIsLoggedIn(true);
    setLoggedInUser(user);
    setCurrentRole(role);
    setActiveTab(initialTab);

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        isLoggedIn: true,
        user,
        role,
        activeTab: initialTab
      }));
    } catch (e) {}

    showToast(`Welcome, ${user.name}! Logged in as ${role.toUpperCase()}.`, 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setCurrentRole('student');
    setActiveTab('dashboard');
    setMobileMenuOpen(false);

    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {}

    showToast('Logged out successfully.', 'info');
  };

  // Change Role Handler with default tabs & storage sync
  const handleRoleChange = (role) => {
    const newTab = role === 'national' ? 'overview' : 'dashboard';
    setCurrentRole(role);
    setActiveTab(newTab);
    setMobileMenuOpen(false);

    try {
      const cur = getStoredAuth();
      if (cur) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          ...cur,
          role,
          activeTab: newTab
        }));
      }
    } catch (e) {}

    showToast(`Switched view to ${role.toUpperCase()} Portal`, 'info');
  };

  // Change Tab Handler with storage sync
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);

    try {
      const cur = getStoredAuth();
      if (cur) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          ...cur,
          activeTab: tab
        }));
      }
    } catch (e) {}
  };

  // Student Apply to Internship (Synced with MySQL)
  const applyToInternship = async (internship) => {
    const exists = applications.some(app => app.jobId === internship.id);
    if (exists) {
      showToast(`Already applied to ${internship.title}!`, 'warning');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: internship.id,
      student_id: studentProfile.id || 'std-2026-001',
      student_name: studentProfile.name,
      student_email: loggedInUser?.email || 'aryan.sharma@college.edu.in',
      company: internship.company,
      title: internship.title,
      appliedDate: "Today (Just now)",
      status: "Application Submitted",
      stage: 1,
      nextStep: "Candidate skill compatibility verification in progress",
      matchScore: internship.matchScore || 85
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Application successfully submitted to ${internship.company}!`, 'success');

    // Post to MySQL Backend API
    try {
      await fetch(`${API_BASE}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
    } catch (e) {
      console.warn('Sync application to MySQL notice:', e.message);
    }
  };

  // Industry Post New Internship (Synced with MySQL)
  const postNewInternship = async (newJob) => {
    const createdJob = {
      id: `job-${Date.now()}`,
      ...newJob,
      matchScore: 85,
      openings: Number(newJob.openings) || 5
    };
    setInternships(prev => [createdJob, ...prev]);
    showToast(`Opportunity "${newJob.title}" posted live for university students!`, 'success');

    try {
      await fetch(`${API_BASE}/internships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdJob)
      });
    } catch (e) {
      console.warn('Sync internship to MySQL notice:', e.message);
    }
  };

  // Industry Shortlist Candidate (Synced with MySQL)
  const updateCandidateStatus = async (candidateId, newStatus) => {
    setCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
    );
    showToast(`Candidate status updated to "${newStatus}"`, 'success');

    try {
      await fetch(`${API_BASE}/candidates/${candidateId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Sync candidate status to MySQL notice:', e.message);
    }
  };

  // Student Complete Assessment & Earn Credits (Synced with MySQL)
  const recordAssessmentResult = async ({ score, totalQuestions, passed, quizTitle }) => {
    if (passed) {
      setStudentProfile(prev => ({
        ...prev,
        readinessScore: Math.min(100, (prev.readinessScore || 84) + 4),
        nepCredits: (prev.nepCredits || 148) + 2,
        skills: prev.skills.map(s =>
          s.name.includes("Clinical Data") || s.name.includes("Ayush")
            ? { ...s, level: Math.min(100, s.level + 20), verified: true }
            : s
        )
      }));
    }

    try {
      const res = await fetch(`${API_BASE}/student/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentProfile.id,
          quiz_title: quizTitle || 'Adaptive Technical Competency Assessment',
          score,
          total_questions: totalQuestions,
          passed,
          credits_awarded: 2
        })
      });
      const data = await res.json();
      if (data && data.studentProfile) {
        setStudentProfile(data.studentProfile);
      }
    } catch (e) {
      console.warn('Sync assessment to MySQL notice:', e.message);
    }
  };

  // Student Enroll in Capstone Challenge (Synced with MySQL)
  const enrollCapstone = async (capstoneId, teamName) => {
    setCapstoneList(prev =>
      prev.map(c => c.id === capstoneId ? { ...c, teamsEnrolled: (c.teamsEnrolled || 0) + 1 } : c)
    );
    try {
      await fetch(`${API_BASE}/capstones/${capstoneId}/enroll`, { method: 'POST' });
    } catch (e) {
      console.warn('Sync capstone enrollment notice:', e.message);
    }
  };

  // Industry / Academia Propose Capstone (Synced with MySQL)
  const postNewCapstone = async (capData) => {
    const created = {
      id: `cap-${Date.now()}`,
      ...capData,
      teamsEnrolled: 1,
      status: 'Accepting Student Teams'
    };
    setCapstoneList(prev => [created, ...prev]);
    showToast(`New Industrial Capstone Challenge "${capData.title}" published!`, 'success');

    try {
      await fetch(`${API_BASE}/capstones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (e) {
      console.warn('Sync new capstone notice:', e.message);
    }
  };

  // Academia Draft MoU (Synced with MySQL)
  const draftNewMou = async (mouData) => {
    const created = {
      id: `mou-${Date.now()}`,
      ...mouData,
      signedDate: 'Sept 2026 (Live)',
      status: 'Active & Legally Verified'
    };
    setMousList(prev => [created, ...prev]);
    showToast(`MoU with "${mouData.partner}" executed and registered on National AICTE Ledger!`, 'success');

    try {
      await fetch(`${API_BASE}/mous`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (e) {
      console.warn('Sync new MoU notice:', e.message);
    }
  };

  // Student Enroll in Bridge Course
  const enrollBridgeCourse = (course) => {
    showToast(`Enrolled in "${course.courseName}" via ${course.provider}! Added to your learning tracker.`, 'success');
  };

  // Student Book Mentorship
  const bookMentorSession = (mentor) => {
    showToast(`1-on-1 Mentorship session requested with ${mentor.name}! Calendar invite dispatched.`, 'success');
  };

  // Academia Submit Curriculum Revision
  const submitCurriculumRevision = (courseCode) => {
    showToast(`Curriculum revision proposal for ${courseCode} submitted to Academic Council & AICTE board!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        isLoggedIn,
        loggedInUser,
        handleLogin,
        handleLogout,
        mobileMenuOpen,
        setMobileMenuOpen,
        // Role & Nav
        currentRole,
        setCurrentRole: handleRoleChange,
        activeTab,
        setActiveTab: handleTabChange,
        // Data & API Sync
        studentProfile,
        setStudentProfile,
        internships,
        applications,
        applyToInternship,
        postNewInternship,
        candidates,
        updateCandidateStatus,
        capstoneList,
        setCapstoneList,
        enrollCapstone,
        postNewCapstone,
        mousList,
        draftNewMou,
        recordAssessmentResult,
        targetRoles: TARGET_ROLE_BENCHMARKS,
        selectedTargetRole,
        setSelectedTargetRole,
        enrollBridgeCourse,
        bookMentorSession,
        submitCurriculumRevision,
        academiaData: {
          ...ACADEMIA_ANALYTICS,
          activeMoUs: mousList,
          activeMoUsCount: mousList.length
        },
        nationalData: NATIONAL_ANALYTICS,
        mentors: mentorsList,
        dbStatus,
        toast,
        setToast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
