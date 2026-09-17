import React, { createContext, useContext, useState } from 'react';
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

export const AppProvider = ({ children }) => {
  // ─── Auth State ───────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Simulated Role
  const [currentRole, setCurrentRole] = useState('student'); // 'student' | 'industry' | 'academia' | 'national'
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Global Data State
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT);
  const [internships, setInternships] = useState(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [candidates, setCandidates] = useState(INDUSTRY_CANDIDATES);
  const [capstoneList, setCapstoneList] = useState(CAPSTONE_PROJECTS);
  const [selectedTargetRole, setSelectedTargetRole] = useState(TARGET_ROLE_BENCHMARKS[0]);
  
  // Toast Alert System
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // ─── Auth Handlers ────────────────────────────────
  const handleLogin = ({ role, user }) => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    setCurrentRole(role);
    setActiveTab(role === 'national' ? 'overview' : 'dashboard');
    showToast(`Welcome, ${user.name}! Logged in as ${role.toUpperCase()}.`, 'success');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setCurrentRole('student');
    setActiveTab('dashboard');
    setMobileMenuOpen(false);
  };

  // Change Role Handler with default tabs
  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setActiveTab(role === 'national' ? 'overview' : 'dashboard');
    setMobileMenuOpen(false);
    showToast(`Switched view to ${role.toUpperCase()} Portal`, 'info');
  };

  // Student Apply to Internship
  const applyToInternship = (internship) => {
    // Check if already applied
    const exists = applications.some(app => app.jobId === internship.id);
    if (exists) {
      showToast(`Already applied to ${internship.title}!`, 'warning');
      return;
    }

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: internship.id,
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
  };

  // Industry Post New Internship
  const postNewInternship = (newJob) => {
    const createdJob = {
      id: `job-${Date.now()}`,
      ...newJob,
      matchScore: 85,
      openings: Number(newJob.openings) || 5
    };
    setInternships(prev => [createdJob, ...prev]);
    showToast(`Opportunity "${newJob.title}" posted live for university students!`, 'success');
  };

  // Industry Shortlist Candidate
  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
    );
    showToast(`Candidate status updated to "${newStatus}"`, 'success');
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
        setActiveTab: (tab) => { setActiveTab(tab); setMobileMenuOpen(false); },
        // Data
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
        targetRoles: TARGET_ROLE_BENCHMARKS,
        selectedTargetRole,
        setSelectedTargetRole,
        enrollBridgeCourse,
        bookMentorSession,
        submitCurriculumRevision,
        academiaData: ACADEMIA_ANALYTICS,
        nationalData: NATIONAL_ANALYTICS,
        mentors: MENTORS_LIST,
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
