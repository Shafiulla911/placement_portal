import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  Zap
} from 'lucide-react';

export const SkillGapAnalyzer = () => {
  const {
    studentProfile,
    targetRoles,
    selectedTargetRole,
    setSelectedTargetRole,
    enrollBridgeCourse,
    showToast
  } = useApp();

  const [simulatedSkills, setSimulatedSkills] = useState({});

  // Calculate dynamic gap analysis
  const calculateAnalysis = () => {
    let totalScore = 0;
    let maxScore = 0;

    const skillBreakdown = selectedTargetRole.requiredSkills.map((req) => {
      // Find matching skill in student profile
      const studentSkill = studentProfile.skills.find(
        (s) => s.name.toLowerCase() === req.name.toLowerCase()
      );

      // Check if simulated
      const currentVal = simulatedSkills[req.name] !== undefined
        ? simulatedSkills[req.name]
        : (studentSkill ? studentSkill.level : 0);

      const isMet = currentVal >= req.minRequired;
      const gap = Math.max(0, req.minRequired - currentVal);

      // Weighted score
      const contribution = Math.min(currentVal / req.minRequired, 1) * req.weight;
      totalScore += contribution;
      maxScore += req.weight;

      return {
        name: req.name,
        required: req.minRequired,
        current: currentVal,
        weight: req.weight,
        isMet,
        gap,
        source: studentSkill?.source || 'Not verified'
      };
    });

    const matchPercentage = Math.round((totalScore / (maxScore || 100)) * 100);

    return {
      matchPercentage,
      skills: skillBreakdown,
      metSkills: skillBreakdown.filter((s) => s.isMet),
      deficitSkills: skillBreakdown.filter((s) => !s.isMet)
    };
  };

  const analysis = calculateAnalysis();

  const handleSimulateSkill = (skillName, newLevel) => {
    setSimulatedSkills((prev) => ({ ...prev, [skillName]: newLevel }));
    showToast(`Simulated skill upgrade for ${skillName} to ${newLevel}%! Match updated.`, 'info');
  };

  const resetSimulation = () => {
    setSimulatedSkills({});
    showToast('Simulation reset to baseline verified skills.', 'info');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Target Role Selector */}
      <div
        className="glass-panel"
        style={{
          padding: '24px',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-indigo">
                <BrainCircuit size={13} /> SIH26044 AI Engine
              </span>
              <span className="badge badge-emerald">Real-time Skill Mapping</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              AI Skill-Gap & Curriculum Mapping Engine
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontSize: '0.9rem', maxWidth: '720px' }}>
              Evaluates student verified competencies against current industry job profiles, identifying deficit skills and recommending accredited bridge roadmaps.
            </p>
          </div>

          {/* Quick Simulation Reset if active */}
          {Object.keys(simulatedSkills).length > 0 && (
            <button onClick={resetSimulation} className="btn btn-secondary btn-sm">
              Reset Simulation Mode
            </button>
          )}
        </div>

        {/* Role Selector Tabs */}
        <div style={{ marginTop: '20px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
            Choose Target Industry Career:
          </label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' }}>
            {targetRoles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedTargetRole(role);
                  setSimulatedSkills({});
                }}
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: selectedTargetRole.id === role.id ? '1px solid #6366f1' : '1px solid var(--border-subtle)',
                  background: selectedTargetRole.id === role.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  color: selectedTargetRole.id === role.id ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: selectedTargetRole.id === role.id ? 700 : 500,
                  fontSize: '0.86rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Target size={15} color={selectedTargetRole.id === role.id ? '#818cf8' : 'currentColor'} />
                <span>{role.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Target Role Overview & Match Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Role Specs */}
        <div className="glass-card" style={{ padding: '22px', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="badge badge-cyan">{selectedTargetRole.domain}</span>
              <h2 style={{ fontSize: '1.2rem', marginTop: '8px' }}>{selectedTargetRole.title}</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Salary Benchmark
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6ee7b7' }}>
                {selectedTargetRole.avgPackage}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>
            {selectedTargetRole.description}
          </p>
          <div style={{ marginTop: '14px', display: 'flex', gap: '10px', fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Industry Demand:</span>
            <span style={{ color: '#fcd34d', fontWeight: 700 }}>{selectedTargetRole.demandLevel}</span>
          </div>
        </div>

        {/* Compatibility Gauge Box */}
        <div
          className="glass-card"
          style={{
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.85) 100%)',
            borderLeft: '4px solid #10b981',
            boxShadow: '0 8px 24px -6px rgba(16, 185, 129, 0.15)'
          }}
        >
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div
              className="pulse-live"
              style={{
                width: '106px',
                height: '106px',
                borderRadius: '50%',
                background: `conic-gradient(#10b981 0% ${analysis.matchPercentage}%, rgba(255, 255, 255, 0.08) ${analysis.matchPercentage}% 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                transition: 'all 0.5s ease',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.35)'
              }}
            >
              <div
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: '#070b14',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span style={{ fontSize: '1.65rem', fontWeight: 900, color: '#10b981', lineHeight: '1', fontFamily: 'var(--font-heading)' }}>
                  {analysis.matchPercentage}%
                </span>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                  MATCH
                </span>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              {analysis.matchPercentage >= 80 ? "High Hiring Readiness" : "Bridge Modules Required"}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              • {analysis.metSkills.length} Competencies Met<br />
              • {analysis.deficitSkills.length} Skill Gaps Identified
            </div>
            <div style={{ marginTop: '10px' }}>
              <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                Est. Time to Bridge: 3-4 Weeks
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Skills Comparison Matrix Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem' }}>Competency Benchmark vs Industry Benchmark</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Interactive matrix: click "Simulate Learning" on deficient skills to observe real-time placement score improvement.
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Skill Competency</th>
                <th style={{ padding: '12px 14px' }}>Student Level</th>
                <th style={{ padding: '12px 14px' }}>Industry Req.</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px' }}>Gap Delta</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Interactive Action</th>
              </tr>
            </thead>
            <tbody>
              {analysis.skills.map((s) => (
                <tr
                  key={s.name}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: !s.isMet ? 'rgba(244, 63, 94, 0.04)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '14px', fontWeight: 600 }}>
                    <div style={{ color: 'var(--text-primary)' }}>{s.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Weight: {s.weight}%</div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="progress-track" style={{ width: '80px', height: '6px' }}>
                        <div
                          className={`progress-fill ${s.isMet ? 'progress-fill-emerald' : 'progress-fill-amber'}`}
                          style={{ width: `${s.current}%` }}
                        />
                      </div>
                      <span style={{ fontWeight: 700 }}>{s.current}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                    {s.required}% Min
                  </td>
                  <td style={{ padding: '14px' }}>
                    {s.isMet ? (
                      <span className="badge badge-emerald">
                        <CheckCircle2 size={12} /> Target Met
                      </span>
                    ) : (
                      <span className="badge badge-rose">
                        <AlertTriangle size={12} /> Deficit Gap
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px' }}>
                    {s.isMet ? (
                      <span style={{ color: '#6ee7b7', fontWeight: 600 }}>+{(s.current - s.required)}% Surplus</span>
                    ) : (
                      <span style={{ color: '#fda4af', fontWeight: 700 }}>-{s.gap}% Deficit</span>
                    )}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    {!s.isMet ? (
                      <button
                        onClick={() => handleSimulateSkill(s.name, s.required + 10)}
                        className="btn btn-outline-primary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                      >
                        <Zap size={12} /> Simulate Mastery
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Bridge Courses & AI Roadmap */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Accredited Bridge Courses */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BookOpen size={18} className="text-indigo-400" />
            <h2 style={{ fontSize: '1.15rem' }}>Accredited Bridge Courses</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {selectedTargetRole.bridgeCourses.map((course, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '16px', borderLeft: '4px solid #6366f1' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="badge badge-indigo">{course.type}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {course.duration}
                  </span>
                </div>

                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginTop: '8px' }}>
                  {course.courseName}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Provided by: <span style={{ color: '#f8fafc', fontWeight: 600 }}>{course.provider}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a5b4fc', marginTop: '6px' }}>
                  Addresses Gap: <strong>{course.skill}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 600 }}>
                    Academic Bank of Credits Eligible
                  </span>
                  <button
                    onClick={() => enrollBridgeCourse(course)}
                    className="btn btn-primary btn-sm"
                  >
                    Enroll Now <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Week AI Bridge Roadmap */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={18} color="#f59e0b" />
            <h2 style={{ fontSize: '1.15rem' }}>4-Week Automated Upskilling Roadmap</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '17px',
                top: '12px',
                bottom: '12px',
                width: '2px',
                background: 'rgba(99, 102, 241, 0.3)'
              }}
            />

            {[
              {
                week: "Week 1: Core Standard Fundamentals",
                desc: "Complete the FHIR 4.0 Clinical Data schemas & HL7 taxonomy intro on Swayam.",
                badge: "Foundational"
              },
              {
                week: "Week 2: Hands-on Lab & Data Extraction",
                desc: "Ingest sample Ayurvedic EHR clinical trial notes and convert to standardized JSON-LD.",
                badge: "Lab Practice"
              },
              {
                week: "Week 3: Containerization & Cloud Deployment",
                desc: "Dockerize clinical informatics pipeline and deploy to AWS Elastic Beanstalk.",
                badge: "Implementation"
              },
              {
                week: "Week 4: Industry Capstone & Mock Interview",
                desc: "Submit mini-capstone project to AIIA sandbox & attend mock technical interview with mentor.",
                badge: "Placement Ready"
              }
            ].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#1e1b4b',
                    border: '2px solid #818cf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#818cf8',
                    flexShrink: 0
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    flex: 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
                      {step.week}
                    </span>
                    <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>
                      {step.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
