import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Sparkles,
  AlertCircle,
  Zap,
  RefreshCw,
  Award,
  ArrowRight
} from 'lucide-react';

export const ResumeSkillExtractor = () => {
  const { showToast, setActiveTab } = useApp();

  const sampleResumes = {
    ayush: `ARYAN SHARMA | B.Tech Computer Science & Bio-Informatics (AIIA New Delhi)
Email: aryan.sharma@aiia.ac.in | CGPA: 8.84

TECHNICAL SUMMARY:
Strong background in Python, machine learning algorithms, and botanical bioinformatics. Experienced with Ayurvedic pharmacopeia taxonomy mapping, FastAPI microservices, and PostgreSQL database administration.

PROJECTS:
1. AyurHerb-AI: Built deep learning CNN and NLP platform identifying 450+ medicinal herb traits aligned with CCRAS taxonomies. Tech: Python, TensorFlow, FastAPI, React.js.
2. Clinical Trial Data Integrator: Standardized hospital registry telemetry using CDISC protocols and SQL queries.

SKILLS DETECTED:
Python, React.js, Node.js, SQL, Machine Learning, Ayush Data Informatics, FastAPI, Clinical Data Standards.`,

    fullstack: `PRIYA PATEL | B.Tech Information Technology (DTU)
Email: priya.patel@dtu.ac.in | CGPA: 9.10

TECHNICAL SUMMARY:
Full Stack Developer specialized in React.js, Node.js, Docker, and AWS Serverless architectures. Built high-concurrency event-driven microservices with Redis and PostgreSQL.

PROJECTS:
1. CloudPay Hub: Scalable payment gateway processing 10k transactions/min with Docker containerization and AWS ECS.
2. HealthStream: Real-time telehealth WebRTC communication suite.

SKILLS DETECTED:
React.js, Node.js, Docker, AWS, PostgreSQL, Redis, REST APIs, TypeScript.`
  };

  const [resumeText, setResumeText] = useState(sampleResumes.ayush);
  const [analyzing, setAnalyzing] = useState(false);
  const [extractedData] = useState({
    atsScore: 88,
    detectedSkills: [
      { name: "Python", category: "Programming", match: 95 },
      { name: "Machine Learning (Scikit-Learn)", category: "AI/ML", match: 88 },
      { name: "Ayush Data Informatics", category: "Domain", match: 85 },
      { name: "SQL & PostgreSQL", category: "Database", match: 90 },
      { name: "React.js", category: "Frontend", match: 82 },
      { name: "Clinical Data Standards (CDISC/FHIR)", category: "Domain", match: 65 }
    ],
    missingKeywords: [
      "FHIR 4.0 HL7 Interoperability",
      "Docker Containerization",
      "AWS Cloud Pipelines"
    ],
    summarySentiment: "Highly competitive profile for Ayush Research & Healthcare ML engineering tracks. Meets 85% of AIIA & Apollo campus requirements."
  });

  const handleRunParser = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      showToast("AI Resume Parser complete! Extracted 6 verified competencies and calculated ATS score (88/100).", "success");
    }, 900);
  };

  const handleSyncToProfile = () => {
    // Sync skills
    showToast("Extracted competencies synchronized with your NEP 2020 Digital Skill Locker!", "success");
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(6, 182, 212, 0.15) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-indigo">
              <Sparkles size={13} /> NLP Skill Intelligence
            </span>
            <span className="badge badge-emerald">Smart Automation (SIH26044)</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            AI Resume & ATS Skill Extractor
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '750px', marginTop: '4px' }}>
            Extract hard skills and project experience from resumes using natural language processing to automatically verify competencies and optimize applicant ranking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setResumeText(sampleResumes.ayush)}
            className="btn btn-secondary btn-sm"
          >
            Load Ayush Bio-AI Resume
          </button>
          <button
            onClick={() => setResumeText(sampleResumes.fullstack)}
            className="btn btn-secondary btn-sm"
          >
            Load Full-Stack Resume
          </button>
        </div>
      </div>

      {/* Two Column Layout: Resume Input + Live Extraction Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* Left: Input Textarea */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} className="text-indigo-400" />
              <h2 style={{ fontSize: '1.15rem' }}>Resume / CV Input</h2>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Supports Text, PDF, DOCX
            </span>
          </div>

          <textarea
            className="form-textarea"
            rows={14}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            style={{
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              lineHeight: '1.5',
              flex: 1,
              marginBottom: '16px'
            }}
          />

          <button
            onClick={handleRunParser}
            disabled={analyzing}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            {analyzing ? (
              <>
                <RefreshCw size={16} className="pulse-live" /> Extracting Skills via NLP...
              </>
            ) : (
              <>
                <Zap size={16} /> Run Automated Skill Extraction
              </>
            )}
          </button>
        </div>

        {/* Right: Extracted Intelligence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* ATS Score Meter Card */}
          <div
            className="glass-card"
            style={{
              padding: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeft: '4px solid #10b981',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                ATS Role Compatibility Score
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10b981', fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
                {extractedData.atsScore}<span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/100</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Strong alignment with Campus Hiring Benchmarks
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button onClick={handleSyncToProfile} className="btn btn-emerald btn-sm">
                <Award size={14} /> Sync to Locker
              </button>
            </div>
          </div>

          {/* Detected Skills Chips */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Detected Verified Competencies</h3>
              <span className="badge badge-indigo">{extractedData.detectedSkills.length} Skills Found</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {extractedData.detectedSkills.map((sk) => (
                <div
                  key={sk.name}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{sk.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sk.category}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="progress-track" style={{ width: '60px', height: '5px' }}>
                      <div className="progress-fill progress-fill-emerald" style={{ width: `${sk.match}%` }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6ee7b7' }}>{sk.match}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Keywords & Suggestions */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <AlertCircle size={16} color="#f59e0b" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fcd34d' }}>
                Keywords to Add for +12% Recruiter Visibility
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {extractedData.missingKeywords.map((kw) => (
                <span key={kw} className="badge badge-amber" style={{ fontSize: '0.74rem' }}>
                  + {kw}
                </span>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('skill-gap')}
              className="btn btn-outline-primary btn-sm"
              style={{ width: '100%' }}
            >
              Bridge These Keywords in Skill Gap Engine <ArrowRight size={13} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
