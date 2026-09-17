import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PlusCircle,
  Sparkles
} from 'lucide-react';

export const PostOpportunityModal = () => {
  const { postNewInternship, setActiveTab } = useApp();

  const [formData, setFormData] = useState({
    title: 'Biomedical AI & Ayush Formulation Analyst',
    company: 'All India Institute of Ayurveda & CCRAS Lab',
    type: 'Placement Pre-Offer (PPO)',
    location: 'New Delhi (Hybrid)',
    stipend: '₹28,000 / month',
    duration: '6 Months',
    openings: '8',
    deadline: '15 Nov 2026',
    partnerMoU: 'Ministry of Ayush / AICTE Co-Funded',
    tagsInput: 'Python, Ayush Informatics, Machine Learning, SQL',
    description: 'Collaborate with clinical scientists on extracting active chemical bio-markers from traditional Ayurvedic herb formulations and train predictive regression models.',
    hiringBatch: '2026 Batch Graduates'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagArray = formData.tagsInput.split(',').map(s => s.trim()).filter(Boolean);

    const newJob = {
      title: formData.title,
      company: formData.company,
      type: formData.type,
      location: formData.location,
      stipend: formData.stipend,
      duration: formData.duration,
      openings: formData.openings,
      deadline: formData.deadline,
      partnerMoU: formData.partnerMoU,
      tags: tagArray,
      requirements: tagArray,
      description: formData.description,
      hiringBatch: formData.hiringBatch,
      featured: true
    };

    postNewInternship(newJob);
    setActiveTab('dashboard');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div className="glass-panel" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-indigo">
            <Sparkles size={13} /> Industry-Academia Placement Drive
          </span>
          <span className="badge badge-emerald">Real-time Campus Dispatch</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
          Post Internship or Campus Placement Opportunity
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Publish directly to AICTE-affiliated engineering and Ayush institutions. The platform will automatically calculate candidate compatibility scores.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Job / Internship Title</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hiring Company / Organization</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Engagement Type</label>
              <select
                className="form-select"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Placement Pre-Offer (PPO)</option>
                <option>Industrial Internship (6 Months)</option>
                <option>Research Fellowship</option>
                <option>Direct Full-Time Campus Hire</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Work Location</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Stipend / CTC</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.stipend}
                onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Open Positions</label>
              <input
                type="number"
                className="form-input"
                required
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Application Deadline</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Partner MoU / Affiliation</label>
              <input
                type="text"
                className="form-input"
                value={formData.partnerMoU}
                onChange={(e) => setFormData({ ...formData, partnerMoU: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Required Skills (Comma separated - used for AI Matchmaking)</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.tagsInput}
              onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
              placeholder="e.g. Python, Machine Learning, SQL, FHIR"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role Description & Deliverables</label>
            <textarea
              className="form-textarea"
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px' }}>
              <PlusCircle size={16} /> Publish to All Campus Portals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
