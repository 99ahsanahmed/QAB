'use client';

import { useState } from 'react';
import { alimCircles, nonAlimCircles } from '../lib/circles';

function CircleTable({ title, rows }) {
  return (
    <section className="circle-table-section" aria-label={title}>
      <div className="circle-table-heading"><div><p className="eyebrow">CIRCLE DIRECTORY</p><h2>{title}</h2></div><span>{rows.length} CIRCLES</span></div>
      <div className="circle-table-wrap"><table><thead><tr><th>Name</th><th>Whatsapp Number</th><th>Block</th><th>Venue</th><th>Day</th><th>Start Time</th></tr></thead><tbody>{rows.map(circle => <tr key={`${circle.name}-${circle.whatsapp}`}><td className="circle-name">{circle.name}</td><td><a className="table-whatsapp" href={`https://wa.me/92${circle.whatsapp.replace(/^0+/, '')}`} target="_blank" rel="noreferrer">{circle.whatsapp}</a></td><td><span className="block-tag">{circle.block}</span></td><td>{circle.venue}</td><td>{circle.day || '—'}</td><td>{circle.startTime || '—'}</td></tr>)}</tbody></table></div>
    </section>
  );
}

export default function Dashboard() {
  const [circleQuery, setCircleQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(null);
  const normalizedCircleQuery = circleQuery.trim().toLowerCase().replace(/^block[\s-]*/, '').replace(/^0+(?=\d)/, '');
  const matchingCircles = normalizedCircleQuery
    ? [...nonAlimCircles.map(circle => ({ ...circle, category: 'Non-Alim Asatza' })), ...alimCircles.map(circle => ({ ...circle, category: 'Aalim Asaatza' }))].filter(circle => circle.block.replace(/^0+(?=\d)/, '') === normalizedCircleQuery)
    : [];

  return (
    <>
      <aside className={`sidebar ${sidebarOpen === null ? '' : sidebarOpen ? 'is-open' : 'is-closed'}`}>
        <a className="brand" href="#top" aria-label="Alburhan home" onClick={() => setSidebarOpen(false)}><img src="/Alburhan_logo-removebg.png" alt="Alburhan" /></a>
        <nav>
          <p className="nav-label">MENU</p>
          <a className="nav-item active" href="#top" onClick={() => setSidebarOpen(false)}>Overview</a>
          <div className="sub-nav"><a href="#records" onClick={() => setSidebarOpen(false)}>Seerat circles</a><a href="#poster" onClick={() => setSidebarOpen(false)}>Promotional poster</a></div>
        </nav>
        <div className="side-footer">PHASE 08<br /><small>GULISTAN-E-JAUHAR</small></div>
      </aside>

      <main id="top" className={sidebarOpen === false ? 'sidebar-collapsed' : ''}>
        <header className="topbar"><button className="menu-toggle" aria-label="Toggle sidebar" aria-expanded={sidebarOpen === true} onClick={() => setSidebarOpen(open => open === null ? true : !open)}>☰</button><p>SEERAT CIRCLE · GULISTAN-E-JAUHAR</p><p className="date">PHASE 08</p></header>
        <section className="hero">
          <div className="hero-copy"><p className="eyebrow">SEERAT CIRCLE · PHASE 08</p><h1>Qabila<br /><em>Abu Bakr</em></h1><p className="intro">Gulistan-e-Jauhar, Karachi</p><a className="scroll-link" href="#records">FIND YOUR CIRCLE <span>↓</span></a></div>
          <div className="hero-stats"><div className="location-stat"><strong>34</strong><span>LOCATIONS</span></div></div><div className="hero-mark" aria-hidden="true">08</div>
        </section>

        <section id="records" className="records-section circle-data-section">
          <div className="circle-finder">
            <p className="eyebrow">FIND A LOCAL CIRCLE</p>
            <h2>Check your block's seerat circle</h2>
            <label className="circle-search"><span aria-hidden="true">⌕</span><input value={circleQuery} onChange={event => setCircleQuery(event.target.value)} placeholder="Enter a block number, e.g. 12 or Block-15" aria-label="Search by block number" /><button type="button" aria-label="Clear block search" onClick={() => setCircleQuery('')}>×</button></label>
            {circleQuery.trim() && <div className="circle-results" aria-live="polite">{matchingCircles.length ? matchingCircles.map((circle, index) => <article className="circle-result" key={`${circle.category}-${circle.name}-${index}`}><div className="result-heading"><span className="result-block">BLOCK {circle.block}</span><span className="result-category">{circle.category}</span></div><h3>{circle.name}</h3><p>{circle.venue}</p><div className="result-details"><span>{circle.day || 'Day not listed'}</span><span>{circle.startTime || 'Time not listed'}</span><a href={`https://wa.me/92${circle.whatsapp.replace(/^0+/, '')}`} target="_blank" rel="noreferrer">WhatsApp {circle.whatsapp}</a></div></article>) : <p className="no-circle-results">No seerat circle details found for that block.</p>}</div>}
          </div>

          <CircleTable title="Seerat Circles by Non-Alim Asatza" rows={nonAlimCircles} />
          <CircleTable title="Seerat Circles by Aalim Asaatza" rows={alimCircles} />

          <section id="poster" className="promotion-section" aria-labelledby="poster-title"><div className="promotion-copy"><p className="eyebrow">PHASE 08</p><h2 id="poster-title">Seerat Circle<br />Phase-8</h2><p>Gulistan-e-Jauhar · Karachi</p><a href="/seerat-ph-08.jpg" target="_blank" rel="noreferrer">View full poster <span aria-hidden="true">↗</span></a></div><img src="/seerat-ph-08.jpg" alt="Seerat Circles Phase 8 promotional poster" /></section>

          <section className="registration-section" aria-labelledby="registration-title"><div className="registration-heading"><p className="eyebrow">GET STARTED</p><h2 id="registration-title">Registration</h2></div><div className="registration-steps"><article className="registration-step"><span className="step-icon" aria-hidden="true">↗</span><span className="step-number">01</span><h3>Go to link</h3><a href="https://albn.org/seerat" target="_blank" rel="noreferrer">albn.org/seerat <span aria-hidden="true">↗</span></a></article><article className="registration-step"><span className="step-icon" aria-hidden="true">☷</span><span className="step-number">02</span><h3>Fill the form</h3><p>Share your registration details.</p></article><article className="registration-step"><span className="step-icon" aria-hidden="true">✓</span><span className="step-number">03</span><h3>Registered!</h3><p>You're part of the Seerat Circle.</p></article></div></section>
        </section>
      </main>

      <a className="whatsapp-fab" href="https://wa.me/923002634349" target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3.5A12.1 12.1 0 0 0 5.6 21.8L4 28l6.4-1.6A12.2 12.2 0 1 0 16 3.5Zm0 22.1c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4A9.8 9.8 0 1 1 16 25.6Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.1c-.2.2-.4.3-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" /></svg><span>Chat on WhatsApp</span></a>
    </>
  );
}
