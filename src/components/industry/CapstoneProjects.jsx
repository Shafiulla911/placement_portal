import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  FolderGit2,
  X,
  Users,
  Award,
  Send
} from 'lucide-react';

export const CapstoneProjects = () => {
  const { capstoneList, setCapstoneList, enrollCapstone, postNewCapstone, showToast } = useApp();
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Modal States
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCapstone, setSelectedCapstone] = useState(null);
  const [proposeModalOpen, setProposeModalOpen] = useState(false);

  // Enroll Form State
  const [enrollForm, setEnrollForm] = useState({
    teamName: 'NeuralAyush Innovators',
    teamLead: 'Aryan Sharma (Lead, CSE & Bio-Informatics)',
    members: 'Pooja Verma (Biotech), Devendra Kulkarni (Embedded IoT)',
    facultyGuide: 'Dr. Radhika Rao (Prof. & Dean R&D)',
    proposalAbstract: 'We propose a transformer-based OCR & NER pipeline for extracting chemical active constituents from traditional Sanskrit formulations and linking them directly with CDISC clinical data standards.',
    githubRepo: 'https://github.com/aryansharma/neural-ayush-ner'
  });

  // New Capstone Proposal Form State
  const [newChallenge, setNewChallenge] = useState({
    title: 'Blockchain-Based Verification of Ayurvedic Herbal Supply Chain & Authenticity',
    company: 'Dabur India & Patanjali Research Foundation',
    stipend: '₹1,80,000 Team Sponsorship',
    duration: '5 Months (Capstone)',
    difficulty: 'Advanced',
    tagsInput: 'Blockchain, Web3, IoT Sensors, Ayush Traceability',
    mentor: 'Dr. Anupam Ghosh (VP Research, Dabur Labs)'
  });

  const handleOpenEnroll = (cap) => {
    setSelectedCapstone(cap);
    setEnrollModalOpen(true);
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (selectedCapstone) {
      if (enrollCapstone) {
        enrollCapstone(selectedCapstone.id, enrollForm.teamName);
      } else {
        setCapstoneList(prev =>
          prev.map(c =>
            c.id === selectedCapstone.id ? { ...c, teamsEnrolled: c.teamsEnrolled + 1 } : c
          )
        );
      }
      showToast(`Team "${enrollForm.teamName}" successfully registered for "${selectedCapstone.title}"! Sandbox provisioned.`, 'success');
    }
    setEnrollModalOpen(false);
  };

  const handleProposeSubmit = (e) => {
    e.preventDefault();
    const tagArray = newChallenge.tagsInput.split(',').map(s => s.trim()).filter(Boolean);

    const created = {
      title: newChallenge.title,
      company: newChallenge.company,
      stipend: newChallenge.stipend,
      duration: newChallenge.duration,
      difficulty: newChallenge.difficulty,
      tags: tagArray,
      mentor: newChallenge.mentor
    };

    if (postNewCapstone) {
      postNewCapstone(created);
    } else {
      const newEntry = {
        id: `cap-${Date.now()}`,
        ...created,
        teamsEnrolled: 1,
        status: 'Accepting Student Teams'
      };
      setCapstoneList(prev => [newEntry, ...prev]);
      showToast(`New Industrial Capstone Challenge "${newChallenge.title}" published to university partners!`, 'success');
    }
    setProposeModalOpen(false);
  };

  const filteredCapstones = capstoneList.filter(c => {
    if (filterDifficulty === 'all') return true;
    return c.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.18) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(99, 102, 241, 0.15) 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-cyan">
              <Sparkles size={13} /> Industry Capstone Problem Statements
            </span>
            <span className="badge badge-emerald">AICTE & NEP 2020 Credit Approved</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Collaborative Industry Capstone Challenges
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '750px', marginTop: '4px' }}>
            Industry sponsors real-world R&D challenges with institutional grants and PPO opportunities for multidisciplinary student teams.
          </p>
        </div>

        <button onClick={() => setProposeModalOpen(true)} className="btn btn-primary">
          <PlusCircle size={16} /> Sponsor New Capstone
        </button>
      </div>

      {/* Filter Control Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderGit2 size={16} className="text-cyan-400" color="#06b6d4" />
          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Filter by Challenge Complexity:
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: 'All Challenges' },
            { id: 'intermediate', label: 'Intermediate' },
            { id: 'advanced', label: 'Advanced' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterDifficulty(f.id)}
              className={`btn btn-sm ${filterDifficulty === f.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Capstone Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '22px' }}>
        {filteredCapstones.map((cap) => (
          <div
            key={cap.id}
            className="glass-card"
            style={{
              padding: '26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '4px solid #06b6d4'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge badge-cyan">{cap.difficulty} Level</span>
                <span className="badge badge-emerald">
                  <CheckCircle2 size={12} /> {cap.status}
                </span>
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '14px 0 6px 0', lineHeight: '1.4' }}>
                {cap.title}
              </h2>

              <div style={{ fontSize: '0.86rem', color: '#67e8f9', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                <Building2 size={14} />
                <span>{cap.company}</span>
              </div>

              {/* Logistics & Grant Info */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  fontSize: '0.82rem',
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Grant Sponsorship:</div>
                  <div style={{ fontWeight: 700, color: '#6ee7b7' }}>{cap.stipend}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Duration:</div>
                  <div style={{ fontWeight: 600 }}>{cap.duration}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Teams Enrolled:</div>
                  <div style={{ fontWeight: 600, color: '#a5b4fc' }}>{cap.teamsEnrolled} Teams Active</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Corporate Mentor:</div>
                  <div style={{ fontWeight: 600 }}>{cap.mentor}</div>
                </div>
              </div>

              {/* Skill Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {cap.tags.map((tag) => (
                  <span key={tag} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
              <button
                onClick={() => handleOpenEnroll(cap)}
                className="btn btn-emerald"
                style={{ width: '100%' }}
              >
                Enroll University Student Team <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal: Enroll University Team */}
      {enrollModalOpen && selectedCapstone && (
        <div className="modal-overlay" onClick={() => setEnrollModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={20} className="text-emerald-400" color="#10b981" />
                <h2 style={{ fontSize: '1.25rem' }}>Enroll Multidisciplinary Student Team</h2>
              </div>
              <button onClick={() => setEnrollModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: '18px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Selected Industry Challenge:</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', marginTop: '2px' }}>{selectedCapstone.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#6ee7b7', marginTop: '4px' }}>Sponsor: {selectedCapstone.company} • Grant: {selectedCapstone.stipend}</div>
            </div>

            <form onSubmit={handleEnrollSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={enrollForm.teamName}
                  onChange={(e) => setEnrollForm({ ...enrollForm, teamName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Team Lead (Name & Program)</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={enrollForm.teamLead}
                  onChange={(e) => setEnrollForm({ ...enrollForm, teamLead: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Multidisciplinary Team Members (NEP 2020 Aligned)</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={enrollForm.members}
                  onChange={(e) => setEnrollForm({ ...enrollForm, members: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Faculty Mentor / Guide</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={enrollForm.facultyGuide}
                  onChange={(e) => setEnrollForm({ ...enrollForm, facultyGuide: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Synopsis & Methodology</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  required
                  value={enrollForm.proposalAbstract}
                  onChange={(e) => setEnrollForm({ ...enrollForm, proposalAbstract: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setEnrollModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  <Send size={15} /> Confirm Registration & Request Sandbox
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Modal: Sponsor New Capstone */}
      {proposeModalOpen && (
        <div className="modal-overlay" onClick={() => setProposeModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={20} className="text-indigo-400" color="#818cf8" />
                <h2 style={{ fontSize: '1.25rem' }}>Sponsor Industry Research Capstone Challenge</h2>
              </div>
              <button onClick={() => setProposeModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProposeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Challenge Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Sponsoring Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={newChallenge.company}
                    onChange={(e) => setNewChallenge({ ...newChallenge, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Grant Amount / Team Sponsorship</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={newChallenge.stipend}
                    onChange={(e) => setNewChallenge({ ...newChallenge, stipend: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={newChallenge.duration}
                    onChange={(e) => setNewChallenge({ ...newChallenge, duration: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Complexity Level</label>
                  <select
                    className="form-select"
                    value={newChallenge.difficulty}
                    onChange={(e) => setNewChallenge({ ...newChallenge, difficulty: e.target.value })}
                  >
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>National Flagship</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Corporate Mentor (Name & Title)</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={newChallenge.mentor}
                  onChange={(e) => setNewChallenge({ ...newChallenge, mentor: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Required Tech Stack / Domain Skills (Comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={newChallenge.tagsInput}
                  onChange={(e) => setNewChallenge({ ...newChallenge, tagsInput: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setProposeModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <PlusCircle size={15} /> Publish to All Campus Portals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
