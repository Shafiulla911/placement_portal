import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';
import { LoginPage } from './components/auth/LoginPage';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { SkillGapAnalyzer } from './components/student/SkillGapAnalyzer';
import { InternshipBoard } from './components/student/InternshipBoard';
import { DigitalLocker } from './components/student/DigitalLocker';
import { MentorshipHub } from './components/student/MentorshipHub';
import { ResumeSkillExtractor } from './components/student/ResumeSkillExtractor';
import { SkillAssessment } from './components/student/SkillAssessment';

// Industry Views
import { IndustryDashboard } from './components/industry/IndustryDashboard';
import { CandidateSearch } from './components/industry/CandidateSearch';
import { PostOpportunityModal } from './components/industry/PostOpportunityModal';
import { CapstoneProjects } from './components/industry/CapstoneProjects';

// Academia Views
import { AcademiaDashboard } from './components/academia/AcademiaDashboard';
import { CurriculumMapping } from './components/academia/CurriculumMapping';
import { MouManager } from './components/academia/MouManager';
import { StudentDirectory } from './components/academia/StudentDirectory';

// National View
import { NationalOverview } from './components/national/NationalOverview';

const AppContent = () => {
  const { currentRole, activeTab, isLoggedIn, handleLogin } = useApp();

  // ─── Auth Gate ──────────────────────────────────────
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Student Persona
    if (currentRole === 'student') {
      switch (activeTab) {
        case 'skill-gap':
          return <SkillGapAnalyzer />;
        case 'resume-parser':
          return <ResumeSkillExtractor />;
        case 'assessment':
          return <SkillAssessment />;
        case 'internships':
          return <InternshipBoard />;
        case 'locker':
          return <DigitalLocker />;
        case 'mentorship':
          return <MentorshipHub />;
        case 'dashboard':
        default:
          return <StudentDashboard />;
      }
    }

    // Industry Persona
    if (currentRole === 'industry') {
      switch (activeTab) {
        case 'candidates':
          return <CandidateSearch />;
        case 'post-job':
          return <PostOpportunityModal />;
        case 'capstone':
          return <CapstoneProjects />;
        case 'dashboard':
        default:
          return <IndustryDashboard />;
      }
    }

    // Academia Persona
    if (currentRole === 'academia') {
      switch (activeTab) {
        case 'curriculum':
          return <CurriculumMapping />;
        case 'mous':
          return <MouManager />;
        case 'students':
          return <StudentDirectory />;
        case 'dashboard':
        default:
          return <AcademiaDashboard />;
      }
    }

    // National / Apex Persona
    if (currentRole === 'national') {
      return <NationalOverview />;
    }

    return <StudentDashboard />;
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="app-main-container">
        <Sidebar />
        <section className="app-content-area">
          {renderContent()}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="app-footer-inner">
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>SIH26044 Prototype</strong> — Portal for Academia–Industry Collaboration for Skill Mapping, Internships & Placement
          </div>
          <div>
            District Level Demonstration • Ministry of Ayush & AICTE Co-Alignment
          </div>
        </div>
      </footer>

      {/* Floating Interactive Toast */}
      <Toast />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
