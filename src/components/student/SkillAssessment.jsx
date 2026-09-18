import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  ArrowRight,
  RotateCcw,
  Check,
  ShieldCheck
} from 'lucide-react';

export const SkillAssessment = () => {
  const { setStudentProfile, recordAssessmentResult, showToast } = useApp();

  const questions = [
    {
      id: 1,
      domain: "Ayush Healthcare Informatics",
      question: "Which data interoperability framework is mandated by the Ayushman Bharat Digital Mission (ABDM) for standardized electronic health records?",
      options: [
        { id: "A", text: "SOAP XML 1.1" },
        { id: "B", text: "HL7 FHIR Release 4.0 (Fast Healthcare Interoperability Resources)" },
        { id: "C", text: "Plain Text CSV" },
        { id: "D", text: "CORBA Distributed Objects" }
      ],
      correct: "B",
      explanation: "HL7 FHIR 4.0 is the national standard under ABDM for structured health data exchange."
    },
    {
      id: 2,
      domain: "Botanical AI & Pharmacology",
      question: "In computational Ayush informatics, what is the role of the IMPPAT (Indian Medicinal Plants, Phytochemistry And Therapeutics) database?",
      options: [
        { id: "A", text: "Billing hospital patient pharmacy invoices" },
        { id: "B", text: "Mapping traditional Indian medicinal herbs to chemical compounds and therapeutic targets" },
        { id: "C", text: "Managing student college attendance records" },
        { id: "D", text: "Encrypting WiFi network traffic" }
      ],
      correct: "B",
      explanation: "IMMPAT maps traditional botanical remedies to modern chemical structures and target pathways."
    },
    {
      id: 3,
      domain: "Cloud & Systems",
      question: "Why is containerization with Docker critical for scalable clinical trial analytics microservices?",
      options: [
        { id: "A", text: "It ensures identical runtime dependencies across research labs, AWS cloud, and hospital nodes" },
        { id: "B", text: "It replaces the need for database storage" },
        { id: "C", text: "It automatically generates Sanskrit translations" },
        { id: "D", text: "It eliminates computer memory requirements" }
      ],
      correct: "A",
      explanation: "Docker packages code and dependencies together, eliminating environment mismatches."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optionId) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionId }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score++;
      }
    });

    if (score >= 2) {
      if (recordAssessmentResult) {
        recordAssessmentResult({
          score,
          totalQuestions: questions.length,
          passed: true,
          quizTitle: 'Adaptive Technical Competency Assessment'
        });
      } else {
        // Fallback local award verified badge
        setStudentProfile(prev => ({
          ...prev,
          readinessScore: Math.min(100, prev.readinessScore + 4),
          nepCredits: prev.nepCredits + 2,
          skills: prev.skills.map(s =>
            s.name.includes("Clinical Data") || s.name.includes("Ayush")
              ? { ...s, level: Math.min(100, s.level + 20), verified: true }
              : s
          )
        }));
      }
      showToast(`Passed with ${score}/${questions.length}! Conferred Verified Ayush Informatics Gold Credential (+2 ABC Credits).`, 'success');
    } else {
      if (recordAssessmentResult) {
        recordAssessmentResult({
          score,
          totalQuestions: questions.length,
          passed: false,
          quizTitle: 'Adaptive Technical Competency Assessment'
        });
      }
      showToast(`Score: ${score}/${questions.length}. Review the explanations and retake to earn your verified badge.`, 'warning');
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(99, 102, 241, 0.2) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald">
              <ShieldCheck size={13} /> Proctored Skill Verification
            </span>
            <span className="badge badge-indigo">NPTEL & AICTE Standard Benchmark</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Adaptive Technical Competency Assessment
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '750px', marginTop: '4px' }}>
            Verify your skills through micro-assessments aligned with national Ayush & Tech curricula. Earn tamper-proof badges verified by hiring partners.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '8px 16px', borderRadius: 'var(--radius-md)' }}>
          <Award size={20} className="text-amber-400" color="#f59e0b" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Reward upon Passing</div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc' }}>+2 ABC Credits & Gold Badge</div>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        
        {/* Progress Tracker */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <span className="badge badge-indigo">{currentQ.domain}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Question {currentIdx + 1} of {questions.length}
          </span>
        </div>

        <div className="progress-track" style={{ height: '6px', marginBottom: '24px' }}>
          <div
            className="progress-fill progress-fill-emerald"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Text */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.5', marginBottom: '24px', color: '#f8fafc' }}>
          {currentQ.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswers[currentIdx] === opt.id;
            const isCorrect = opt.id === currentQ.correct;

            let borderStyle = '1px solid var(--border-subtle)';
            let bgStyle = 'rgba(255, 255, 255, 0.03)';
            let textStyle = '#f8fafc';

            if (isSelected) {
              borderStyle = '1px solid #6366f1';
              bgStyle = 'rgba(99, 102, 241, 0.2)';
            }

            if (isSubmitted) {
              if (isCorrect) {
                borderStyle = '1px solid #10b981';
                bgStyle = 'rgba(16, 185, 129, 0.2)';
                textStyle = '#6ee7b7';
              } else if (isSelected && !isCorrect) {
                borderStyle = '1px solid #f43f5e';
                bgStyle = 'rgba(244, 63, 94, 0.2)';
                textStyle = '#fda4af';
              }
            }

            return (
              <div
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: borderStyle,
                  background: bgStyle,
                  color: textStyle,
                  cursor: isSubmitted ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s ease',
                  fontSize: '0.92rem'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    flexShrink: 0
                  }}
                >
                  {opt.id}
                </div>
                <span style={{ fontWeight: isSelected ? 600 : 400 }}>{opt.text}</span>
              </div>
            );
          })}
        </div>

        {/* Explanation when submitted */}
        {isSubmitted && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.85rem',
              color: '#d1fae5',
              marginBottom: '20px'
            }}
          >
            <strong>Explanation:</strong> {currentQ.explanation}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="btn btn-secondary btn-sm"
            style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
          >
            Previous Question
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {currentIdx < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn btn-primary btn-sm"
              >
                Next Question <ArrowRight size={14} />
              </button>
            ) : !isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="btn btn-emerald"
              >
                <Check size={16} /> Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="btn btn-secondary btn-sm"
              >
                <RotateCcw size={14} /> Retake Assessment
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
