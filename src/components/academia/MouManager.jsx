import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  PlusCircle,
  CheckCircle2,
  ShieldCheck,
  X,
  Send,
  Download
} from 'lucide-react';

export const MouManager = () => {
  const { academiaData, showToast } = useApp();
  const [mous, setMous] = useState(academiaData.activeMoUs);

  // Modal States
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [viewDossierModal, setViewDossierModal] = useState(null);

  // Draft Form State
  const [draftForm, setDraftForm] = useState({
    partner: "Dr. Reddy's Laboratories & Biopharma Analytics",
    scope: "Co-development of clinical AI bioinformatics sandbox, 15 Annual Fellowships, and joint laboratory funding.",
    duration: "4 Years (2026 - 2030)",
    focalPerson: "Dr. Anjali Deshmukh (Head, Academic Research Alliances)",
    tier: "Tier-1 Strategic Alliance"
  });

  const handleDraftSubmit = (e) => {
    e.preventDefault();
    const newMoU = {
      partner: draftForm.partner,
      scope: draftForm.scope,
      signedDate: "Sept 2026 (Live)",
      validUntil: "Sept 2030",
      status: "Active & Legally Verified"
    };

    setMous(prev => [newMoU, ...prev]);
    showToast(`MoU with "${draftForm.partner}" executed and registered on National AICTE Ledger!`, 'success');
    setDraftModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(6, 78, 59, 0.4) 0%, rgba(15, 23, 42, 0.9) 60%, rgba(99, 102, 241, 0.15) 100%)',
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
              <ShieldCheck size={13} /> Legally Binding Partnerships
            </span>
            <span className="badge badge-indigo">NEP 2020 Industry Cluster</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Corporate MoUs & Industry Partnership Desk
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px', maxWidth: '750px' }}>
            Manage bilateral institutional agreements for student internships, sponsored research labs, and faculty development.
          </p>
        </div>

        <button onClick={() => setDraftModalOpen(true)} className="btn btn-emerald">
          <PlusCircle size={16} /> Draft New Industry MoU
        </button>
      </div>

      {/* MoUs List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '22px' }}>
        {mous.map((mou, idx) => (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: '26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '4px solid #10b981'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge badge-emerald">
                  <CheckCircle2 size={12} /> {mou.status}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Valid until: {mou.validUntil}
                </span>
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '14px 0 6px 0', lineHeight: '1.4' }}>
                {mou.partner}
              </h2>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  margin: '14px 0'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Collaboration Scope & Deliverables
                </div>
                <p style={{ fontSize: '0.86rem', color: '#f8fafc', marginTop: '4px', lineHeight: '1.5' }}>
                  {mou.scope}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>Signed: {mou.signedDate}</span>
                <span style={{ color: '#6ee7b7', fontWeight: 600 }}>Institutional Tier-1</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', marginTop: '16px' }}>
              <button
                onClick={() => setViewDossierModal(mou)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <FileCheck size={14} /> View Signed Legal Agreement
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Draft New MoU */}
      {draftModalOpen && (
        <div className="modal-overlay" onClick={() => setDraftModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} className="text-emerald-400" color="#10b981" />
                <h2 style={{ fontSize: '1.25rem' }}>Draft National Industry-Academia MoU</h2>
              </div>
              <button onClick={() => setDraftModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleDraftSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Corporate / Industry Partner Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={draftForm.partner}
                  onChange={(e) => setDraftForm({ ...draftForm, partner: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Collaboration Scope & Student Benefit (Fellowships, Labs, Credits)</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  required
                  value={draftForm.scope}
                  onChange={(e) => setDraftForm({ ...draftForm, scope: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Agreement Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={draftForm.duration}
                    onChange={(e) => setDraftForm({ ...draftForm, duration: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Alliance Classification</label>
                  <select
                    className="form-select"
                    value={draftForm.tier}
                    onChange={(e) => setDraftForm({ ...draftForm, tier: e.target.value })}
                  >
                    <option>Tier-1 Strategic Alliance</option>
                    <option>Research & Capstone Partner</option>
                    <option>Hiring & Placement Consortia</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Industry Focal Person & Title</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={draftForm.focalPerson}
                  onChange={(e) => setDraftForm({ ...draftForm, focalPerson: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setDraftModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-emerald">
                  <Send size={15} /> Execute & Publish Agreement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Signed Legal Accord Dossier */}
      {viewDossierModal && (
        <div className="modal-overlay" onClick={() => setViewDossierModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div>
                <span className="badge badge-emerald" style={{ marginBottom: '4px' }}>AICTE & NEP 2020 Validated</span>
                <h2 style={{ fontSize: '1.2rem' }}>Memorandum of Understanding (MoU) Dossier</h2>
              </div>
              <button onClick={() => setViewDossierModal(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ background: '#090d16', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.25)', marginBottom: '18px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Bilateral Industry-Academia Collaboration Accord
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '4px', color: '#f8fafc' }}>
                  {viewDossierModal.partner}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  and All India Institute of Technology & Ayurveda Sciences (AIIA)
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                <strong>Agreed Scope of Bilateral Engagement:</strong><br />
                {viewDossierModal.scope}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Signed Execution:</div>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>{viewDossierModal.signedDate}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Valid Duration:</div>
                  <div style={{ fontWeight: 600, color: '#6ee7b7' }}>Until {viewDossierModal.validUntil}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Signatory Authority:</div>
                  <div style={{ fontWeight: 600, color: '#f8fafc' }}>Prof. Radhika Rao (Dean)</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)' }}>Ledger Verification:</div>
                  <div style={{ fontFamily: 'monospace', color: '#fcd34d' }}>HASH: 0x9c41...8e12</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => showToast("Exporting PDF Legal Dossier with Digital Signatures...", "success")} className="btn btn-primary btn-sm">
                <Download size={14} /> Download Certified Accord (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
