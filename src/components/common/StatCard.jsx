import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'indigo' }) => {
  const colorMap = {
    indigo: {
      border: 'rgba(99, 102, 241, 0.3)',
      bg: 'rgba(99, 102, 241, 0.1)',
      text: '#a5b4fc',
      glow: 'rgba(99, 102, 241, 0.2)'
    },
    emerald: {
      border: 'rgba(16, 185, 129, 0.3)',
      bg: 'rgba(16, 185, 129, 0.1)',
      text: '#6ee7b7',
      glow: 'rgba(16, 185, 129, 0.2)'
    },
    amber: {
      border: 'rgba(245, 158, 11, 0.3)',
      bg: 'rgba(245, 158, 11, 0.1)',
      text: '#fcd34d',
      glow: 'rgba(245, 158, 11, 0.2)'
    },
    cyan: {
      border: 'rgba(6, 182, 212, 0.3)',
      bg: 'rgba(6, 182, 212, 0.1)',
      text: '#67e8f9',
      glow: 'rgba(6, 182, 212, 0.2)'
    },
    rose: {
      border: 'rgba(244, 63, 94, 0.3)',
      bg: 'rgba(244, 63, 94, 0.1)',
      text: '#fda4af',
      glow: 'rgba(244, 63, 94, 0.2)'
    }
  };

  const currentTheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      className="glass-card"
      style={{
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `4px solid ${currentTheme.text}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {title}
          </span>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, marginTop: '4px', fontFamily: 'var(--font-heading)' }}>
            {value}
          </div>
          {subtitle && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {subtitle}
            </div>
          )}
        </div>

        {Icon && (
          <div
            style={{
              padding: '11px',
              borderRadius: '14px',
              background: currentTheme.bg,
              border: `1px solid ${currentTheme.border}`,
              color: currentTheme.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 4px 12px ${currentTheme.glow}`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      {trend && (
        <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
          <span style={{ color: currentTheme.text, fontWeight: 700 }}>{trend}</span>
          <span style={{ color: 'var(--text-muted)' }}>vs previous cohort</span>
        </div>
      )}
    </div>
  );
};
