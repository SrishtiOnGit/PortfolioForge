import React, { useState } from 'react'
import '../styles/dashboard.css'

const Dashboard = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    title: 'Professional Banker',
    email: 'johndoe@email.com',
    phone: '+1 (555) 019-2834',
    summary: 'Experienced professional with a proven track record...',
    skills: [],
    experience: [
      { company: 'Global Bank', role: 'Loan Officer', duration: '2023 - Present', desc: 'Managed assets...' }
    ],
    githubUrl: '',
    projects: [
      { title: 'Portfolio Forge', tech: 'React, CSS', desc: 'A dynamic live resume builder.' }
    ],
    certifications: [],
    languages: [],
    themeColor: '#aa3bff'
  });

  const [githubUsername, setGithubUsername] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [newCert, setNewCert] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false); 

  const addProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', tech: '', desc: '' }]
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setProfile(prev => {
      const updated = [...prev.projects];
      updated[index][field] = value;
      return { ...prev, projects: updated };
    });
  };

  const addCertification = () => {
    if (!newCert.trim()) return;
    setProfile(prev => ({ ...prev, certifications: [...prev.certifications, newCert.trim()] }));
    setNewCert('');
  };

  const addLanguage = () => {
    if (!newLang.trim()) return;
    setProfile(prev => ({ ...prev, languages: [...prev.languages, newLang.trim()] }));
    setNewLang('');
  };

  const handleGitHubSync = async () => {
    if (!githubUsername.trim()) return;
    setIsSyncing(true);

    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(prev => ({
          ...prev,
          fullName: data.name || prev.fullName,
          summary: data.bio || prev.summary,
          githubUrl: data.html_url
        }));
      } else {
        alert("User not found!");
      }
    } catch (error) {
      console.error("Error fetching from GitHub:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFullAIEnhance = () => {
    if (!profile.summary.trim()) return;
    setIsAiLoading(true);

    setTimeout(() => {
      setProfile(prev => {
        const rawSummary = prev.summary.toLowerCase();
        let optimizedSummary = "Results-driven professional with a proven track record of operational excellence and performance optimization.";
        if (rawSummary.includes('bank') || rawSummary.includes('money') || rawSummary.includes('finance')) {
          optimizedSummary = "Results-driven financial professional with a proven track record in financial operations, risk mitigation, and wealth management.";
        } else if (rawSummary.includes('code') || rawSummary.includes('web') || rawSummary.includes('dev') || rawSummary.includes('build')) {
          optimizedSummary = "Innovative software engineer adept at full-stack architectural development, scalable systems, and rapid technical execution.";
        } else if (rawSummary.includes('manage') || rawSummary.includes('lead') || rawSummary.includes('team')) {
          optimizedSummary = "Strategic leader with cross-functional expertise, driving project lifecycle management and team empowerment.";
        }

        const optimizedExperience = prev.experience.map(exp => {
          let cleanDesc = exp.desc || "";
          if (cleanDesc.length > 5) {
            cleanDesc = `Spearheaded corporate tasks driving organizational efficiency. Leveraged foundational business practices to maximize deliverable value and scale operations: ${exp.desc}`;
          }
          return { ...exp, desc: cleanDesc };
        });

        const optimizedProjects = prev.projects.map(proj => {
          let cleanDesc = proj.desc || "";
          if (cleanDesc.length > 5) {
            cleanDesc = `Engineered dynamic application module with clean architectural patterns. Synchronized front-to-back integration models for premium processing: ${proj.desc}`;
          }
          return { ...proj, desc: cleanDesc };
        });

        return {
          ...prev,
          summary: optimizedSummary,
          experience: optimizedExperience,
          projects: optimizedProjects
        };
      });
      setIsAiLoading(false);
    }, 1200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill('');
  };

  const addExperience = () => {
    const newJob = { company: '', role: '', duration: '', desc: '' };
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, newJob]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setProfile(prev => {
      const updatedExperience = [...prev.experience];
      updatedExperience[index][field] = value;
      return { ...prev, experience: updatedExperience };
    });
  };

  const getLightness = (hex) => {
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const isDarkTheme = getLightness(profile.themeColor) < 80;

  return (
    <div className='dashboard-layout' style={{ '--accent': profile.themeColor }}>
      <aside className='dashboard-sidebar'>
        <div className='dashboard-header'>
          <h2>Portfolio Forge</h2>
          <p>Configure your sections</p>
          <button type="button" className="btn-pdf-export" onClick={() => window.print()}>
            🖨️ Export as Professional PDF
          </button>
        </div>
        
        <div className='sidebar-form'>
          <div className='form-group'>
            <label>Full Name</label>
            <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label>Job Title</label>
            <input type="text" name="title" value={profile.title} onChange={handleInputChange} />
          </div>
          <div className='form-group-row' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div className='form-group'>
              <label>Email Address</label>
              <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <label>Phone Number</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} />
            </div>
          </div>
          <div className='form-group'>
            <label>Professional Summary</label>
            <textarea name="summary" rows="3" value={profile.summary} onChange={handleInputChange} />
          </div>

          <div className='form-group'>
            <label>⚡ Quick Sync GitHub</label>
            <div className="skill-input-row">
              <input 
                type="text" 
                placeholder="Enter username (e.g. octocat)" 
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
              <button 
                type="button" 
                onClick={handleGitHubSync} 
                className="btn-add"
                disabled={isSyncing}
              >
                {isSyncing ? 'Syncing...' : 'Sync'}
              </button>
            </div>
          </div>

          <hr className="sidebar-divider" />

          <div className='form-group'>
            <label>Add Key Competencies / Skills</label>
            <div className="skill-input-row">
              <input 
                type="text" 
                placeholder="e.g. Project Management" 
                value={newSkill} 
                onChange={(e) => setNewSkill(e.target.value)} 
              />
              <button type="button" onClick={addSkill} className="btn-add">Add</button>
            </div>
          </div>

          <hr className="sidebar-divider" />

          <div className="experience-form-section">
            <div className="section-header-row">
              <label>Work History</label>
              <button type="button" onClick={addExperience} className="btn-add-section">+ Add Job</button>
            </div>

            {profile.experience.map((exp, index) => (
              <div key={index} className="experience-block-input">
                <input 
                  type="text" placeholder="Company Name" 
                  value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} 
                />
                <input 
                  type="text" placeholder="Job Role" 
                  value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} 
                />
                <input 
                  type="text" placeholder="Duration (e.g., 2022 - 2024)" 
                  value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} 
                />
                <textarea 
                  placeholder="Key Responsibilities / Achievements" rows="2"
                  value={exp.desc} onChange={(e) => handleExperienceChange(index, 'desc', e.target.value)} 
                />
              </div>
            ))}
          </div>

          <hr className="sidebar-divider" />

          <div className="experience-form-section">
            <div className="section-header-row">
              <label>Projects Portfolio</label>
              <button type="button" onClick={addProject} className="btn-add-section">+ Add Project</button>
            </div>
            {profile.projects.map((proj, index) => (
              <div key={index} className="experience-block-input">
                <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => handleProjectChange(index, 'title', e.target.value)} />
                <input type="text" placeholder="Technologies Used (e.g. React, Node)" value={proj.tech} onChange={(e) => handleProjectChange(index, 'tech', e.target.value)} />
                <textarea placeholder="Briefly describe what you built..." rows="2" value={proj.desc} onChange={(e) => handleProjectChange(index, 'desc', e.target.value)} />
              </div>
            ))}
          </div>

          <hr className="sidebar-divider" />

          <div className='form-group'>
            <label>Certifications & Awards</label>
            <div className="skill-input-row">
              <input type="text" placeholder="e.g. AWS Certified Practitioner" value={newCert} onChange={(e) => setNewCert(e.target.value)} />
              <button type="button" onClick={addCertification} className="btn-add">Add</button>
            </div>
          </div>

          <hr className="sidebar-divider" />

          <div className='form-group'>
            <label>Languages Spoken</label>
            <div className="skill-input-row">
              <input type="text" placeholder="e.g. French (Fluent)" value={newLang} onChange={(e) => setNewLang(e.target.value)} />
              <button type="button" onClick={addLanguage} className="btn-add">Add</button>
            </div>
          </div>

          <div className="global-optimize-container" style={{ marginTop: '30px' }}>
            <button 
              type="button" 
              onClick={handleFullAIEnhance} 
              className="btn-global-optimize"
              disabled={isAiLoading}
            >
              {isAiLoading ? '✨ Re-architecting Resume Content...' : '🚀 Optimize Whole Document with AI'}
            </button>
          </div>

          <hr className="sidebar-divider" />

          <div className='form-group'>
            <label>🎨 Choose Accent Template Theme</label>
            <div className="theme-picker-row">
              {['#881337', '#1e3a8a', '#0f766e', '#6d28d9', '#c2410c', '#1e293b'].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`theme-dot ${profile.themeColor === color ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => setProfile(prev => ({ ...prev, themeColor: color }))}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className='preview-canvas'>
        <div 
          className='portfolio-paper' 
          style={{ 
            backgroundColor: isDarkTheme ? '#1e293b' : '#ffffff',
            color: isDarkTheme ? '#f8fafc' : '#1e293b',
            borderTopColor: profile.themeColor
          }}
        >
          <header className='portfolio-header'>
            <h1>{profile.fullName || 'Your Name'}</h1>
            <h3 style={{ color: profile.themeColor }}>{profile.title || 'Professional Title'}</h3>
            <div className="portfolio-meta-row" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '8px', fontSize: '0.9rem', color: isDarkTheme ? '#cbd5e1' : '#475569' }}>
              {profile.email && <span>📧 {profile.email}</span>}
              {profile.phone && <span>📞 {profile.phone}</span>}
              {profile.githubUrl && (
                <span className="portfolio-link">
                  🌐 {profile.githubUrl}
                </span>
              )}
            </div>
          </header>

          <hr 
            className='portfolio-divider' 
            style={{ borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}
          />

          <section className="portfolio-section">
            <h4 style={{ color: isDarkTheme ? '#f1f5f9' : '#1e293b', borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>Summary</h4>
            <p style={{ color: isDarkTheme ? '#cbd5e1' : '#475569' }}>{profile.summary || 'Write something about yourself...'}</p>
          </section>

          {profile.skills.length > 0 && (
            <section className="portfolio-section">
              <h4 style={{ color: isDarkTheme ? '#f1f5f9' : '#1e293b', borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>Core Competencies</h4>
              <div className="skills-grid-preview">
                {profile.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="preview-skill-pill"
                    style={{ 
                      borderLeftColor: profile.themeColor,
                      backgroundColor: isDarkTheme ? '#334155' : '#f8fafc',
                      color: isDarkTheme ? '#f1f5f9' : '#1e293b'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {profile.experience.length > 0 && (
            <section className="portfolio-section">
              <h4 style={{ color: isDarkTheme ? '#f1f5f9' : '#1e293b', borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>Professional Timeline</h4>
              {profile.experience.map((exp, i) => (
                <div key={i} className="preview-exp-item">
                  <div className="exp-row-meta">
                    <strong style={{ color: isDarkTheme ? '#f8fafc' : '#1e293b' }}>{exp.role || 'Position Title'}</strong>
                    <span style={{ color: isDarkTheme ? '#94a3b8' : '#64748b' }}>{exp.duration || 'Timeline Dates'}</span>
                  </div>
                  <div className="exp-company-sub" style={{ color: profile.themeColor }}>{exp.company || 'Company Target Enterprise'}</div>
                  <p className="exp-desc-text" style={{ color: isDarkTheme ? '#cbd5e1' : '#475569' }}>{exp.desc || 'Responsibilities and context achievements description detail text...'}</p>
                </div>
              ))}
            </section>
          )}

          {profile.projects && profile.projects.length > 0 && (
            <section className="portfolio-section">
              <h4 style={{ color: isDarkTheme ? '#f1f5f9' : '#1e293b', borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>Featured Engineering Projects</h4>
              {profile.projects.map((proj, i) => (
                <div key={i} className="preview-exp-item">
                  <div className="exp-row-meta">
                    <strong style={{ color: isDarkTheme ? '#f8fafc' : '#1e293b' }}>{proj.title || 'Project Title'}</strong>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500', color: profile.themeColor }}>{proj.tech}</span>
                  </div>
                  <p className="exp-desc-text" style={{ color: isDarkTheme ? '#cbd5e1' : '#475569' }}>{proj.desc || 'Project structural details and contribution build notes...'}</p>
                </div>
              ))}
            </section>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            {profile.certifications && profile.certifications.length > 0 && (
              <section className="portfolio-section">
                <h4 style={{ color: isDarkTheme ? '#f1f5f9' : '#1e293b', borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>Certifications</h4>
                <ul style={{ paddingLeft: '18px', color: isDarkTheme ? '#cbd5e1' : '#475569', fontSize: '0.95rem', margin: 0 }}>
                  {profile.certifications.map((cert, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>{cert}</li>
                  ))}
                </ul>
              </section>
            )}

            {profile.languages && profile.languages.length > 0 && (
              <section className="portfolio-section">
                <h4 style={{ color: isDarkTheme ? '#f1f5f9' : '#1e293b', borderColor: isDarkTheme ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }}>Languages</h4>
                <div className="skills-grid-preview">
                  {profile.languages.map((lang, i) => (
                    <span 
                      key={i} 
                      className="preview-skill-pill" 
                      style={{ 
                        backgroundColor: isDarkTheme ? '#334155' : '#f1f5f9',
                        color: isDarkTheme ? '#f1f5f9' : '#475569',
                        border: isDarkTheme ? '1px solid #475569' : '1px solid #cbd5e1'
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard