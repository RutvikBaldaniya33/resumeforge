/* =========================================
   RESUMEFORGE — script.js
   Complete Resume Builder Logic
   ========================================= */

'use strict';

// ============================================
// STATE
// ============================================
const state = {
  photo: null,
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  languages: [],
  links: [],
  currentTemplate: 1,
  customization: {
    font: "'DM Sans', sans-serif",
    fontSize: 12,
    color: '#2563eb'
  },
  sectionOrder: ['summary','skills','experience','education','certifications','languages','links']
};

// ============================================
// TEMPLATE DEFINITIONS (50 templates)
// ============================================
const TEMPLATES = [
  // MINIMAL
  { id:1,  name:'Classic Clean',     category:'minimal',   desc:'Timeless centered layout' },
  { id:7,  name:'ATS Friendly',      category:'minimal',   desc:'Keyword-optimized, simple' },
  { id:9,  name:'Startup Minimal',   category:'minimal',   desc:'Bold typography, airy' },
  { id:16, name:'Monochrome',        category:'minimal',   desc:'Pure black & white' },
  { id:20, name:'Swiss Clean',       category:'minimal',   desc:'Modernist grid layout' },
  { id:21, name:'Paper White',       category:'minimal',   desc:'Ultra-clean classic' },
  { id:22, name:'Type Driven',       category:'minimal',   desc:'Typography-first' },
  { id:23, name:'Zen Minimal',       category:'minimal',   desc:'Maximum whitespace' },
  { id:24, name:'Editorial',         category:'minimal',   desc:'Magazine-inspired' },
  // MODERN
  { id:5,  name:'Two Column',        category:'modern',    desc:'Sidebar + main layout' },
  { id:8,  name:'Creative Blocks',   category:'modern',    desc:'Gradient header' },
  { id:13, name:'Teal Accent',       category:'modern',    desc:'Side stripe accent' },
  { id:18, name:'Sunny Warm',        category:'modern',    desc:'Yellow header energy' },
  { id:25, name:'Bold Split',        category:'modern',    desc:'Diagonal color split' },
  { id:26, name:'Card Modern',       category:'modern',    desc:'Card-based sections' },
  { id:27, name:'Highlight Line',    category:'modern',    desc:'Colored line accents' },
  { id:28, name:'Overlap Header',    category:'modern',    desc:'Overlapping elements' },
  { id:29, name:'Gradient Flow',     category:'modern',    desc:'Smooth gradient design' },
  { id:30, name:'Rounded Modern',    category:'modern',    desc:'Soft rounded corners' },
  // CORPORATE
  { id:6,  name:'Corporate Pro',     category:'corporate', desc:'Full header bar' },
  { id:10, name:'Executive Bold',    category:'corporate', desc:'Dark header presence' },
  { id:17, name:'Navy Stripe',       category:'corporate', desc:'Professional navy tones' },
  { id:31, name:'Board Room',        category:'corporate', desc:'Formal structured' },
  { id:32, name:'Consulting Firm',   category:'corporate', desc:'Big-4 inspired' },
  { id:33, name:'Finance Clean',     category:'corporate', desc:'Banking professional' },
  { id:34, name:'Legal Brief',       category:'corporate', desc:'Structured formal' },
  { id:35, name:'Director Level',    category:'corporate', desc:'C-suite executive' },
  { id:36, name:'Classic Blue',      category:'corporate', desc:'Royal blue authority' },
  { id:37, name:'Enterprise',        category:'corporate', desc:'Large org ready' },
  // CREATIVE
  { id:12, name:'Rose Bloom',        category:'creative',  desc:'Pink & elegant' },
  { id:15, name:'Indigo Academic',   category:'creative',  desc:'Serif scholarly' },
  { id:4,  name:'Elegant Serif',     category:'creative',  desc:'Refined typography' },
  { id:38, name:'Vibrant Pop',       category:'creative',  desc:'Bold color blocks' },
  { id:39, name:'Artisan',           category:'creative',  desc:'Handcrafted feel' },
  { id:40, name:'Portfolio Studio',  category:'creative',  desc:'Designer showcase' },
  { id:41, name:'Pastel Dream',      category:'creative',  desc:'Soft pastel palette' },
  { id:42, name:'Bold Strokes',      category:'creative',  desc:'Thick accent lines' },
  { id:43, name:'Infographic',       category:'creative',  desc:'Visual-heavy layout' },
  // DEVELOPER
  { id:3,  name:'Dev Dark',          category:'developer', desc:'GitHub-inspired dark' },
  { id:19, name:'Cyber Neon',        category:'developer', desc:'Neon on black' },
  { id:11, name:'Green Terminal',    category:'developer', desc:'Terminal green accent' },
  { id:44, name:'Code Block',        category:'developer', desc:'Monospace code style' },
  { id:45, name:'Open Source',       category:'developer', desc:'Minimal dev focus' },
  { id:46, name:'Stack Overflow',    category:'developer', desc:'Orange dev vibes' },
  { id:47, name:'Matrix Pulse',      category:'developer', desc:'Green on dark grid' },
  { id:48, name:'API Docs Style',    category:'developer', desc:'Documentation look' },
  // STUDENT
  { id:2,  name:'Student Sidebar',   category:'student',   desc:'Clean sidebar entry-level' },
  { id:14, name:'Campus Orange',     category:'student',   desc:'Energetic & fresh' },
  { id:49, name:'Fresh Graduate',    category:'student',   desc:'First job ready' },
  { id:50, name:'Intern Ready',      category:'student',   desc:'Clean & approachable' },
];

// Extended color palettes for templates 21-50
const TEMPLATE_ACCENTS = {
  21:'#374151', 22:'#000000', 23:'#6b7280', 24:'#b45309',
  25:'#7c3aed', 26:'#0284c7', 27:'#16a34a', 28:'#dc2626',
  29:'#7e22ce', 30:'#0891b2', 31:'#1e3a5f', 32:'#1f2937',
  33:'#1d4ed8', 34:'#374151', 35:'#111827', 36:'#1e40af',
  37:'#0f172a', 38:'#ea580c', 39:'#854d0e', 40:'#6d28d9',
  41:'#db2777', 42:'#1d4ed8', 43:'#059669',
  44:'#16a34a', 45:'#0f172a', 46:'#ea580c', 47:'#15803d', 48:'#1d4ed8',
  49:'#0284c7', 50:'#059669'
};

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Section nav
  document.querySelectorAll('.snav').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.snav').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });

  // Initial data
  addExperience();
  addEducation();
  ['Python','JavaScript','React','Node.js','Git'].forEach(s => { state.skills.push(s); });
  renderSkillTags();
  updatePreview();
  buildTemplateGrid();
  initSortable();
  setZoom(0.9);
});

// ============================================
// PHOTO UPLOAD
// ============================================
function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    state.photo = ev.target.result;
    const img = document.getElementById('photoPreview');
    img.src = state.photo;
    img.style.display = 'block';
    document.getElementById('photoPlaceholder').style.display = 'none';
    updatePreview();
  };
  reader.readAsDataURL(file);
}

// ============================================
// SKILLS
// ============================================
function addSkill() {
  const input = document.getElementById('skillInput');
  const val = input.value.trim();
  if (!val) return;
  if (!state.skills.includes(val)) {
    state.skills.push(val);
    renderSkillTags();
    updatePreview();
  }
  input.value = '';
  input.focus();
}

function removeSkill(skill) {
  state.skills = state.skills.filter(s => s !== skill);
  renderSkillTags();
  updatePreview();
}

function renderSkillTags() {
  const container = document.getElementById('skillsTags');
  container.innerHTML = state.skills.map(s => `
    <span class="skill-tag">
      ${escHtml(s)}
      <span class="remove-skill" onclick="removeSkill('${escHtml(s)}')">×</span>
    </span>
  `).join('');
}

// ============================================
// DYNAMIC ENTRIES — EXPERIENCE
// ============================================
let expCount = 0;
function addExperience() {
  const id = ++expCount;
  state.experience.push({ id, title:'', company:'', location:'', start:'', end:'', current:false, description:'' });
  renderExperienceList();
}

function removeExperience(id) {
  state.experience = state.experience.filter(e => e.id !== id);
  renderExperienceList();
  updatePreview();
}

function renderExperienceList() {
  const container = document.getElementById('experienceList');
  container.innerHTML = state.experience.map((exp, i) => `
    <div class="entry-card" id="exp-${exp.id}">
      <div class="entry-header">
        <span class="entry-title">Experience #${i+1}</span>
        <button class="btn-remove-entry" onclick="removeExperience(${exp.id})">×</button>
      </div>
      <div class="form-grid">
        <div class="form-group full">
          <label>Job Title</label>
          <input type="text" value="${escHtml(exp.title)}" placeholder="Software Engineer" 
            oninput="updateExp(${exp.id},'title',this.value)"/>
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" value="${escHtml(exp.company)}" placeholder="Acme Corp"
            oninput="updateExp(${exp.id},'company',this.value)"/>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" value="${escHtml(exp.location)}" placeholder="Remote / City"
            oninput="updateExp(${exp.id},'location',this.value)"/>
        </div>
      </div>
      <div class="date-row" style="margin-top:10px">
        <div class="form-group">
          <label>Start Date</label>
          <input type="month" value="${exp.start}" oninput="updateExp(${exp.id},'start',this.value)"/>
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="month" value="${exp.end}" ${exp.current ? 'disabled' : ''} oninput="updateExp(${exp.id},'end',this.value)"/>
        </div>
      </div>
      <label class="currently-working" style="margin-top:8px">
        <input type="checkbox" ${exp.current ? 'checked' : ''} onchange="updateExp(${exp.id},'current',this.checked)"/>
        Currently working here
      </label>
      <div class="form-group full" style="margin-top:10px">
        <label>Description (one bullet per line)</label>
        <textarea rows="4" placeholder="• Developed features...&#10;• Improved performance by 30%"
          oninput="updateExp(${exp.id},'description',this.value)">${escHtml(exp.description)}</textarea>
      </div>
    </div>
  `).join('');
}

function updateExp(id, field, value) {
  const entry = state.experience.find(e => e.id === id);
  if (!entry) return;
  entry[field] = value;
  if (field === 'current') {
    renderExperienceList(); // re-render to disable/enable end date
  }
  updatePreview();
}

// ============================================
// EDUCATION
// ============================================
let eduCount = 0;
function addEducation() {
  const id = ++eduCount;
  state.education.push({ id, school:'', degree:'', field:'', location:'', grad:'' });
  renderEducationList();
}

function removeEducation(id) {
  state.education = state.education.filter(e => e.id !== id);
  renderEducationList();
  updatePreview();
}

function renderEducationList() {
  const container = document.getElementById('educationList');
  container.innerHTML = state.education.map((edu, i) => `
    <div class="entry-card">
      <div class="entry-header">
        <span class="entry-title">Education #${i+1}</span>
        <button class="btn-remove-entry" onclick="removeEducation(${edu.id})">×</button>
      </div>
      <div class="form-grid">
        <div class="form-group full">
          <label>School Name</label>
          <input type="text" value="${escHtml(edu.school)}" placeholder="MIT, Stanford..."
            oninput="updateEdu(${edu.id},'school',this.value)"/>
        </div>
        <div class="form-group">
          <label>Degree</label>
          <input type="text" value="${escHtml(edu.degree)}" placeholder="B.Sc., M.S., Ph.D."
            oninput="updateEdu(${edu.id},'degree',this.value)"/>
        </div>
        <div class="form-group">
          <label>Field of Study</label>
          <input type="text" value="${escHtml(edu.field)}" placeholder="Computer Science"
            oninput="updateEdu(${edu.id},'field',this.value)"/>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" value="${escHtml(edu.location)}" placeholder="Boston, MA"
            oninput="updateEdu(${edu.id},'location',this.value)"/>
        </div>
        <div class="form-group">
          <label>Graduation Date</label>
          <input type="month" value="${edu.grad}" oninput="updateEdu(${edu.id},'grad',this.value)"/>
        </div>
      </div>
    </div>
  `).join('');
}

function updateEdu(id, field, value) {
  const entry = state.education.find(e => e.id === id);
  if (entry) { entry[field] = value; updatePreview(); }
}

// ============================================
// CERTIFICATIONS
// ============================================
let certCount = 0;
function addCertification() {
  const id = ++certCount;
  state.certifications.push({ id, name:'', issuer:'', date:'' });
  renderCertificationList();
}

function removeCertification(id) {
  state.certifications = state.certifications.filter(c => c.id !== id);
  renderCertificationList();
  updatePreview();
}

function renderCertificationList() {
  const container = document.getElementById('certificationList');
  container.innerHTML = state.certifications.map((cert, i) => `
    <div class="entry-card">
      <div class="entry-header">
        <span class="entry-title">Certification #${i+1}</span>
        <button class="btn-remove-entry" onclick="removeCertification(${cert.id})">×</button>
      </div>
      <div class="form-grid">
        <div class="form-group full">
          <label>Certification Name</label>
          <input type="text" value="${escHtml(cert.name)}" placeholder="AWS Certified Developer"
            oninput="updateCert(${cert.id},'name',this.value)"/>
        </div>
        <div class="form-group">
          <label>Issuer</label>
          <input type="text" value="${escHtml(cert.issuer)}" placeholder="Amazon, HackerRank..."
            oninput="updateCert(${cert.id},'issuer',this.value)"/>
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="month" value="${cert.date}" oninput="updateCert(${cert.id},'date',this.value)"/>
        </div>
      </div>
    </div>
  `).join('');
}

function updateCert(id, field, value) {
  const entry = state.certifications.find(c => c.id === id);
  if (entry) { entry[field] = value; updatePreview(); }
}

// ============================================
// LANGUAGES
// ============================================
let langCount = 0;
const LANG_LEVELS = ['Native','Fluent','Advanced','Intermediate','Basic'];

function addLanguage() {
  const id = ++langCount;
  state.languages.push({ id, language:'', level:'Intermediate' });
  renderLanguageList();
}

function removeLanguage(id) {
  state.languages = state.languages.filter(l => l.id !== id);
  renderLanguageList();
  updatePreview();
}

function renderLanguageList() {
  const container = document.getElementById('languageList');
  container.innerHTML = state.languages.map((lang, i) => `
    <div class="entry-card">
      <div class="entry-header">
        <span class="entry-title">Language #${i+1}</span>
        <button class="btn-remove-entry" onclick="removeLanguage(${lang.id})">×</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Language</label>
          <input type="text" value="${escHtml(lang.language)}" placeholder="English, Hindi..."
            oninput="updateLang(${lang.id},'language',this.value)"/>
        </div>
        <div class="form-group">
          <label>Proficiency</label>
          <select onchange="updateLang(${lang.id},'level',this.value)">
            ${LANG_LEVELS.map(l => `<option value="${l}" ${lang.level===l?'selected':''}>${l}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
  `).join('');
}

function updateLang(id, field, value) {
  const entry = state.languages.find(l => l.id === id);
  if (entry) { entry[field] = value; updatePreview(); }
}

// ============================================
// LINKS / PROFILES
// ============================================
let linkCount = 0;
const LINK_TYPES = ['LinkedIn','GitHub','Portfolio','Personal Website','Twitter','Behance','Dribbble','Other'];

function addLink() {
  const id = ++linkCount;
  state.links.push({ id, type:'LinkedIn', url:'' });
  renderLinkList();
}

function removeLink(id) {
  state.links = state.links.filter(l => l.id !== id);
  renderLinkList();
  updatePreview();
}

function renderLinkList() {
  const container = document.getElementById('linkList');
  container.innerHTML = state.links.map((link, i) => `
    <div class="entry-card">
      <div class="entry-header">
        <span class="entry-title">Link #${i+1}</span>
        <button class="btn-remove-entry" onclick="removeLink(${link.id})">×</button>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label>Type</label>
          <select onchange="updateLink(${link.id},'type',this.value)">
            ${LINK_TYPES.map(t => `<option value="${t}" ${link.type===t?'selected':''}>${t}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>URL</label>
          <input type="url" value="${escHtml(link.url)}" placeholder="https://..."
            oninput="updateLink(${link.id},'url',this.value)"/>
        </div>
      </div>
    </div>
  `).join('');
}

function updateLink(id, field, value) {
  const entry = state.links.find(l => l.id === id);
  if (entry) { entry[field] = value; updatePreview(); }
}

// ============================================
// DATA COLLECTORS
// ============================================
function getData() {
  return {
    fullName:   val('fullName'),
    phone:      val('phone'),
    email:      val('email'),
    location:   val('location'),
    jobTitle:   val('jobTitle'),
    linkedin:   val('linkedin'),
    github:     val('github'),
    portfolio:  val('portfolio'),
    summary:    val('summary'),
    photo:      state.photo,
    skills:     [...state.skills],
    experience: [...state.experience],
    education:  [...state.education],
    certifications: [...state.certifications],
    languages:  [...state.languages],
    links:      [...state.links],
  };
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ============================================
// RESUME RENDERER — Core HTML Builder
// ============================================
function updatePreview() {
  const d = getData();
  const t = state.currentTemplate;
  const el = document.getElementById('resumePreview');

  // Apply template class
  el.className = `resume-preview template-${t}`;

  // Apply customizations
  const accent = state.customization.color || '#2563eb';
  el.style.setProperty('--accent', accent);
  el.style.fontFamily = state.customization.font;
  el.style.fontSize = state.customization.fontSize + 'px';

  // Set accent light dynamically
  el.style.setProperty('--accent-light', hexToRgba(accent, 0.08));

  // Build HTML based on template family
  let html = '';
  if (t <= 1)       html = buildTemplate1(d, accent);
  else if (t === 2) html = buildTemplate2(d, accent);
  else if (t === 3) html = buildTemplate3(d, accent);
  else if (t === 4) html = buildTemplate4(d, accent);
  else if (t === 5) html = buildTemplate5(d, accent);
  else if (t === 6) html = buildTemplate6(d, accent);
  else if (t === 7) html = buildTemplate7(d, accent);
  else if (t === 8) html = buildTemplate8(d, accent);
  else if (t === 9) html = buildTemplate9(d, accent);
  else if (t === 10) html = buildTemplate10(d, accent);
  else if (t === 11) html = buildTemplate11(d, accent);
  else if (t === 12) html = buildTemplate12(d, accent);
  else if (t === 13) html = buildTemplate13(d, accent);
  else if (t === 14) html = buildTemplate14(d, accent);
  else if (t === 15) html = buildTemplate15(d, accent);
  else if (t === 16) html = buildTemplate16(d, accent);
  else if (t === 17) html = buildTemplate17(d, accent);
  else if (t === 18) html = buildTemplate18(d, accent);
  else if (t === 19) html = buildTemplate19(d, accent);
  else if (t === 20) html = buildTemplate20(d, accent);
  else html = buildTemplateGeneric(d, t, TEMPLATE_ACCENTS[t] || accent);

  el.innerHTML = html;
}

// ============================================
// SECTION BUILDERS (reusable blocks)
// ============================================
function fmtDate(ym) {
  if (!ym) return '';
  const [y, m] = ym.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${y}`;
}

function buildBullets(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.replace(/^[•\-\*]\s*/,'')).filter(l => l.trim());
  if (!lines.length) return '';
  return `<ul class="r-bullets">${lines.map(l => `<li>${escHtml(l)}</li>`).join('')}</ul>`;
}

function buildSkills(skills, pillClass='r-skill-pill') {
  if (!skills.length) return '';
  return `<div class="r-skills-wrap">${skills.map(s => `<span class="${pillClass}">${escHtml(s)}</span>`).join('')}</div>`;
}

function buildContact(d, sep=' · ') {
  return [d.phone, d.email, d.location]
    .filter(Boolean).map(escHtml).join(sep);
}

function buildLinks(d) {
  const links = [];
  if (d.linkedin)  links.push(d.linkedin);
  if (d.github)    links.push(d.github);
  if (d.portfolio) links.push(d.portfolio);
  d.links.forEach(l => { if (l.url) links.push(l.url); });
  return links;
}

function buildSections(d, renderFn, accent) {
  return state.sectionOrder.map(sec => {
    switch(sec) {
      case 'summary': return d.summary ? renderFn.summary(d, accent) : '';
      case 'skills':  return d.skills.length ? renderFn.skills(d, accent) : '';
      case 'experience': return d.experience.some(e => e.title||e.company) ? renderFn.experience(d, accent) : '';
      case 'education': return d.education.some(e => e.school) ? renderFn.education(d, accent) : '';
      case 'certifications': return d.certifications.some(c => c.name) ? renderFn.certifications(d, accent) : '';
      case 'languages': return d.languages.some(l => l.language) ? renderFn.languages(d, accent) : '';
      case 'links': return buildLinks(d).length ? renderFn.links(d, accent) : '';
      default: return '';
    }
  }).join('');
}

// ---- Standard section renderers ----
const stdSections = {
  summary: (d, ac) => `
    <div class="r-section r-section-summary" style="margin-bottom:16px">
      <div class="r-section-title" style="color:${ac};border-color:${ac}">Professional Summary</div>
      <p style="color:#444;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p>
    </div>`,
  skills: (d, ac) => `
    <div class="r-section" style="margin-bottom:16px">
      <div class="r-section-title" style="color:${ac};border-color:${ac}">Skills</div>
      ${buildSkills(d.skills)}
    </div>`,
  experience: (d, ac) => `
    <div class="r-section" style="margin-bottom:16px">
      <div class="r-section-title" style="color:${ac};border-color:${ac}">Experience</div>
      ${d.experience.filter(e=>e.title||e.company).map(e => `
        <div class="r-entry">
          <div class="r-entry-header">
            <div>
              <div class="r-entry-title">${escHtml(e.title)}</div>
              <div class="r-entry-sub">${escHtml(e.company)}${e.location ? ` · ${escHtml(e.location)}` : ''}</div>
            </div>
            <div class="r-entry-date">
              ${fmtDate(e.start)}${e.start ? ' – ' : ''}${e.current ? 'Present' : fmtDate(e.end)}
            </div>
          </div>
          ${buildBullets(e.description)}
        </div>`).join('')}
    </div>`,
  education: (d, ac) => `
    <div class="r-section" style="margin-bottom:16px">
      <div class="r-section-title" style="color:${ac};border-color:${ac}">Education</div>
      ${d.education.filter(e=>e.school).map(e => `
        <div class="r-entry">
          <div class="r-entry-header">
            <div>
              <div class="r-entry-title">${escHtml(e.school)}</div>
              <div class="r-entry-sub">${[e.degree, e.field].filter(Boolean).map(escHtml).join(', ')}${e.location ? ` · ${escHtml(e.location)}` : ''}</div>
            </div>
            <div class="r-entry-date">${fmtDate(e.grad)}</div>
          </div>
        </div>`).join('')}
    </div>`,
  certifications: (d, ac) => `
    <div class="r-section" style="margin-bottom:16px">
      <div class="r-section-title" style="color:${ac};border-color:${ac}">Certifications</div>
      ${d.certifications.filter(c=>c.name).map(c => `
        <div class="r-entry" style="margin-bottom:6px">
          <div class="r-entry-header">
            <div class="r-entry-title">${escHtml(c.name)}</div>
            <div class="r-entry-date">${c.issuer ? escHtml(c.issuer) + (c.date ? ' · ' : '') : ''}${fmtDate(c.date)}</div>
          </div>
        </div>`).join('')}
    </div>`,
  languages: (d, ac) => `
    <div class="r-section" style="margin-bottom:16px">
      <div class="r-section-title" style="color:${ac};border-color:${ac}">Languages</div>
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        ${d.languages.filter(l=>l.language).map(l => `
          <span style="font-size:0.88em"><strong>${escHtml(l.language)}</strong> — ${escHtml(l.level)}</span>
        `).join('')}
      </div>
    </div>`,
  links: (d, ac) => {
    const all = buildLinks(d);
    if (!all.length) return '';
    return `
      <div class="r-section" style="margin-bottom:16px">
        <div class="r-section-title" style="color:${ac};border-color:${ac}">Profiles & Links</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px">
          ${all.map(url => `<a href="${escHtml(url)}" style="font-size:0.88em;color:${ac};word-break:break-all">${escHtml(url)}</a>`).join('')}
        </div>
      </div>`;
  }
};

// ============================================
// TEMPLATE BUILD FUNCTIONS
// ============================================

function buildTemplate1(d, ac) {
  return `
    <div class="r-header" style="text-align:center;margin-bottom:20px">
      ${d.photo ? `<img class="r-photo" src="${d.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 10px"/>` : ''}
      <div class="r-name" style="font-size:2.2em;font-weight:700">${escHtml(d.fullName) || 'Your Name'}</div>
      ${d.jobTitle ? `<div style="color:#555;font-size:1em;margin-top:3px">${escHtml(d.jobTitle)}</div>` : ''}
      <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:0.85em;color:#666">
        ${[d.phone,d.email,d.location,...buildLinks(d)].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
      </div>
    </div>
    <hr class="r-divider" style="border:none;height:1.5px;background:${ac};margin-bottom:16px"/>
    ${buildSections(d, stdSections, ac)}`;
}

function buildTemplate2(d, ac) {
  const sidebar = `
    <div class="r-sidebar" style="background:#1e293b;color:white;padding:32px 18px">
      ${d.photo ? `<img class="r-photo" src="${d.photo}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 14px;border:3px solid rgba(255,255,255,0.2)"/>` : ''}
      <div style="font-size:1.3em;font-weight:700;color:white;text-align:center">${escHtml(d.fullName)||'Your Name'}</div>
      ${d.jobTitle ? `<div style="font-size:0.8em;color:#94a3b8;text-align:center;margin-top:3px">${escHtml(d.jobTitle)}</div>` : ''}
      <div style="color:#60a5fa;font-size:0.78em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #334155;padding-bottom:4px;margin-top:18px;margin-bottom:10px">Contact</div>
      ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<div style="font-size:0.8em;color:#cbd5e1;margin-bottom:6px;word-break:break-all">${escHtml(v)}</div>`).join('')}
      ${d.skills.length ? `
        <div style="color:#60a5fa;font-size:0.78em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #334155;padding-bottom:4px;margin-top:18px;margin-bottom:10px">Skills</div>
        <div>${d.skills.map(s=>`<span style="background:rgba(255,255,255,0.1);color:white;padding:3px 8px;border-radius:4px;font-size:0.8em;display:inline-block;margin:2px">${escHtml(s)}</span>`).join('')}</div>
      ` : ''}
      ${d.languages.some(l=>l.language) ? `
        <div style="color:#60a5fa;font-size:0.78em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #334155;padding-bottom:4px;margin-top:18px;margin-bottom:10px">Languages</div>
        ${d.languages.filter(l=>l.language).map(l=>`<div style="font-size:0.8em;color:#cbd5e1;margin-bottom:4px"><strong>${escHtml(l.language)}</strong> — ${escHtml(l.level)}</div>`).join('')}
      ` : ''}
    </div>`;
  const main = `
    <div style="padding:32px 28px">
      ${d.summary ? `<div style="margin-bottom:16px"><div class="r-section-title" style="color:#1e293b;border-bottom:2px solid ${ac};padding-bottom:4px;margin-bottom:8px">Summary</div><p style="color:#444;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>` : ''}
      ${d.experience.some(e=>e.title||e.company) ? `<div style="margin-bottom:16px"><div class="r-section-title" style="color:#1e293b;border-bottom:2px solid ${ac};padding-bottom:4px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.title)}</div><div class="r-entry-sub">${escHtml(e.company)}${e.location?` · ${escHtml(e.location)}`:''}</div></div><div class="r-entry-date">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>` : ''}
      ${d.education.some(e=>e.school) ? `<div style="margin-bottom:16px"><div class="r-section-title" style="color:#1e293b;border-bottom:2px solid ${ac};padding-bottom:4px;margin-bottom:8px">Education</div>${d.education.filter(e=>e.school).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.school)}</div><div class="r-entry-sub">${[e.degree,e.field].filter(Boolean).map(escHtml).join(', ')}</div></div><div class="r-entry-date">${fmtDate(e.grad)}</div></div></div>`).join('')}</div>` : ''}
      ${d.certifications.some(c=>c.name) ? stdSections.certifications(d,ac) : ''}
    </div>`;
  return `<div style="display:grid;grid-template-columns:200px 1fr;min-height:1123px">${sidebar}${main}</div>`;
}

function buildTemplate3(d, ac) {
  return `
    <div style="padding:40px 48px;background:#0d1117;color:#c9d1d9;font-family:'JetBrains Mono',monospace;min-height:1123px">
      ${d.photo ? `<img src="${d.photo}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid #58a6ff;margin-bottom:12px"/>` : ''}
      <div style="font-size:2em;font-weight:700;color:#58a6ff">${escHtml(d.fullName)||'Your Name'}</div>
      ${d.jobTitle ? `<div style="color:#8b949e;font-size:0.88em">${escHtml(d.jobTitle)}</div>` : ''}
      <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:8px;font-size:0.78em;color:#8b949e">
        ${[d.phone,d.email,d.location,...buildLinks(d)].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
      </div>
      <hr style="border:none;height:1px;background:#21262d;margin:16px 0"/>
      ${buildSections(d, {
        summary: (d,ac)=>`<div style="margin-bottom:16px"><div style="color:#58a6ff;font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #21262d;padding-bottom:4px;margin-bottom:8px"><span style="color:#3fb950"># </span>Summary</div><p style="color:#8b949e;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>`,
        skills: (d,ac)=>`<div style="margin-bottom:16px"><div style="color:#58a6ff;font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #21262d;padding-bottom:4px;margin-bottom:8px"><span style="color:#3fb950"># </span>Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:#161b22;border:1px solid #30363d;color:#58a6ff;padding:2px 10px;border-radius:4px;font-size:0.82em">${escHtml(s)}</span>`).join('')}</div></div>`,
        experience: (d,ac)=>`<div style="margin-bottom:16px"><div style="color:#58a6ff;font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #21262d;padding-bottom:4px;margin-bottom:8px"><span style="color:#3fb950"># </span>Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div style="font-weight:600;color:#e6edf3">${escHtml(e.title)}</div><div style="color:#8b949e;font-size:0.9em">${escHtml(e.company)}${e.location?` · ${escHtml(e.location)}`:''}</div></div><div style="color:#3fb950;font-size:0.85em">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>`,
        education: (d,ac)=>`<div style="margin-bottom:16px"><div style="color:#58a6ff;font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #21262d;padding-bottom:4px;margin-bottom:8px"><span style="color:#3fb950"># </span>Education</div>${d.education.filter(e=>e.school).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div style="font-weight:600;color:#e6edf3">${escHtml(e.school)}</div><div style="color:#8b949e;font-size:0.9em">${[e.degree,e.field].filter(Boolean).map(escHtml).join(', ')}</div></div><div style="color:#3fb950;font-size:0.85em">${fmtDate(e.grad)}</div></div></div>`).join('')}</div>`,
        certifications: stdSections.certifications,
        languages: stdSections.languages,
        links: stdSections.links
      }, ac)}
    </div>`;
}

function buildTemplate4(d, ac) {
  return `
    <div style="padding:52px 56px">
      <div style="border-bottom:3px double #1a1a1a;padding-bottom:18px;margin-bottom:22px;overflow:hidden">
        ${d.photo ? `<img src="${d.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;float:right;margin-left:20px"/>` : ''}
        <div style="font-family:'Playfair Display',serif;font-size:2.8em;font-weight:700;color:#1a1a1a;letter-spacing:-1px;line-height:1.1">${escHtml(d.fullName)||'Your Name'}</div>
        ${d.jobTitle ? `<div style="font-family:'Playfair Display',serif;font-size:1.1em;color:#555;font-style:italic;margin-top:4px">${escHtml(d.jobTitle)}</div>` : ''}
        <div style="display:flex;flex-wrap:wrap;gap:16px;margin-top:10px;font-size:0.85em;color:#555">
          ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
        </div>
      </div>
      ${buildSections(d, {
        ...stdSections,
        summary: (d,ac)=>`<div style="margin-bottom:16px"><div style="font-family:'Playfair Display',serif;font-size:1.05em;font-weight:700;border-bottom:1px solid #1a1a1a;padding-bottom:4px;margin-bottom:8px">Professional Summary</div><p style="color:#444;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>`,
        skills: (d,ac)=>`<div style="margin-bottom:16px"><div style="font-family:'Playfair Display',serif;font-size:1.05em;font-weight:700;border-bottom:1px solid #1a1a1a;padding-bottom:4px;margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="font-size:0.88em"><span style="color:${ac};font-size:0.7em">● </span>${escHtml(s)}</span>`).join('')}</div></div>`,
        experience: (d,ac)=>`<div style="margin-bottom:16px"><div style="font-family:'Playfair Display',serif;font-size:1.05em;font-weight:700;border-bottom:1px solid #1a1a1a;padding-bottom:4px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.title)}</div><div class="r-entry-sub">${escHtml(e.company)}</div></div><div class="r-entry-date">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>`,
        education: (d,ac)=>`<div style="margin-bottom:16px"><div style="font-family:'Playfair Display',serif;font-size:1.05em;font-weight:700;border-bottom:1px solid #1a1a1a;padding-bottom:4px;margin-bottom:8px">Education</div>${d.education.filter(e=>e.school).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.school)}</div><div class="r-entry-sub">${[e.degree,e.field].filter(Boolean).map(escHtml).join(', ')}</div></div><div class="r-entry-date">${fmtDate(e.grad)}</div></div></div>`).join('')}</div>`,
        certifications: stdSections.certifications,
        languages: stdSections.languages,
        links: stdSections.links
      }, ac)}
    </div>`;
}

function buildTemplate5(d, ac) {
  const mainContent = `
    <div style="padding:36px 28px">
      <div style="font-size:2em;font-weight:700;margin-bottom:4px">${escHtml(d.fullName)||'Your Name'}</div>
      ${d.jobTitle ? `<div style="color:${ac};font-weight:500;margin-bottom:18px">${escHtml(d.jobTitle)}</div>` : ''}
      ${d.summary ? `<div style="margin-bottom:16px"><div class="r-section-title" style="color:${ac};border-bottom:2px solid ${ac};padding-bottom:4px;margin-bottom:8px">Summary</div><p style="color:#444;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>` : ''}
      ${d.experience.some(e=>e.title||e.company) ? `<div style="margin-bottom:16px"><div class="r-section-title" style="color:${ac};border-bottom:2px solid ${ac};padding-bottom:4px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.title)}</div><div class="r-entry-sub">${escHtml(e.company)}${e.location?` · ${escHtml(e.location)}`:''}</div></div><div class="r-entry-date">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>` : ''}
    </div>`;
  const sidebarContent = `
    <div style="background:${ac};color:white;padding:36px 18px">
      ${d.photo ? `<img src="${d.photo}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 14px;border:4px solid white"/>` : ''}
      <div style="font-size:1.3em;font-weight:700;text-align:center;color:white">${escHtml(d.fullName)||'Your Name'}</div>
      ${d.jobTitle ? `<div style="font-size:0.8em;color:rgba(255,255,255,0.8);text-align:center;margin-top:4px">${escHtml(d.jobTitle)}</div>` : ''}
      ${[d.phone,d.email,d.location].filter(Boolean).length ? `
        <div style="color:rgba(255,255,255,0.7);font-size:0.75em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:18px 0 8px">Contact</div>
        ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<div style="font-size:0.8em;color:rgba(255,255,255,0.85);margin-bottom:6px">${escHtml(v)}</div>`).join('')}
      ` : ''}
      ${d.skills.length ? `
        <div style="color:rgba(255,255,255,0.7);font-size:0.75em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:18px 0 8px">Skills</div>
        <div>${d.skills.map(s=>`<span style="background:rgba(255,255,255,0.15);color:white;padding:3px 8px;border-radius:4px;font-size:0.8em;display:inline-block;margin:2px">${escHtml(s)}</span>`).join('')}</div>
      ` : ''}
      ${d.education.some(e=>e.school) ? `
        <div style="color:rgba(255,255,255,0.7);font-size:0.75em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:18px 0 8px">Education</div>
        ${d.education.filter(e=>e.school).map(e=>`<div style="margin-bottom:10px"><div style="font-size:0.88em;font-weight:600;color:white">${escHtml(e.school)}</div><div style="font-size:0.8em;color:rgba(255,255,255,0.8)">${[e.degree,e.field].filter(Boolean).map(escHtml).join(', ')}</div><div style="font-size:0.78em;color:rgba(255,255,255,0.7)">${fmtDate(e.grad)}</div></div>`).join('')}
      ` : ''}
    </div>`;
  return `<div style="display:grid;grid-template-columns:1fr 260px;min-height:1123px">${mainContent}${sidebarContent}</div>`;
}

function buildTemplate6(d, ac) {
  return `
    <div>
      <div style="background:${ac};padding:28px 48px;color:white;display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:18px">
          ${d.photo ? `<img src="${d.photo}" style="width:68px;height:68px;border-radius:50%;object-fit:cover;border:3px solid white"/>` : ''}
          <div>
            <div style="font-size:2em;font-weight:700;color:white">${escHtml(d.fullName)||'Your Name'}</div>
            ${d.jobTitle ? `<div style="color:rgba(255,255,255,0.85);font-size:0.9em;margin-top:3px">${escHtml(d.jobTitle)}</div>` : ''}
          </div>
        </div>
        <div style="text-align:right;font-size:0.82em;color:rgba(255,255,255,0.85);line-height:1.9">
          ${[d.phone,d.email,d.location,...buildLinks(d)].filter(Boolean).map(v=>`<div>${escHtml(v)}</div>`).join('')}
        </div>
      </div>
      <div style="padding:32px 48px">
        ${buildSections(d, {
          ...stdSections,
          skills: (d,ac)=>`<div style="margin-bottom:16px"><div style="font-size:0.85em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${ac};border-bottom:2px solid #e5e7eb;padding-bottom:4px;margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:#eff6ff;color:${ac};border:1px solid #bfdbfe;padding:3px 10px;border-radius:4px;font-size:0.88em">${escHtml(s)}</span>`).join('')}</div></div>`,
        }, ac)}
      </div>
    </div>`;
}

function buildTemplate7(d, ac) {
  return `
    <div style="padding:36px 48px">
      <div style="border-bottom:2px solid #000;padding-bottom:6px;margin-bottom:10px">
        <div style="font-size:2em;font-weight:700">${escHtml(d.fullName)||'Your Name'}</div>
        ${d.jobTitle ? `<div style="color:#444;font-size:0.92em">${escHtml(d.jobTitle)}</div>` : ''}
      </div>
      <div style="font-size:0.85em;color:#555;margin-bottom:18px">
        ${[d.phone,d.email,d.location,...buildLinks(d)].filter(Boolean).map(escHtml).join(' | ')}
      </div>
      ${buildSections(d, {
        summary: (d,ac)=>`<div style="margin-bottom:14px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #aaa;padding-bottom:3px;margin-bottom:8px">Summary</div><p style="color:#333;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>`,
        skills: (d,ac)=>`<div style="margin-bottom:14px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #aaa;padding-bottom:3px;margin-bottom:8px">Skills</div><p style="font-size:0.88em;color:#333">${d.skills.map(escHtml).join(' ▪ ')}</p></div>`,
        experience: (d,ac)=>`<div style="margin-bottom:14px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #aaa;padding-bottom:3px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.title)}</div><div class="r-entry-sub">${escHtml(e.company)}${e.location?` | ${escHtml(e.location)}`:''}</div></div><div class="r-entry-date">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>`,
        education: (d,ac)=>`<div style="margin-bottom:14px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;border-bottom:1px solid #aaa;padding-bottom:3px;margin-bottom:8px">Education</div>${d.education.filter(e=>e.school).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.school)}</div><div class="r-entry-sub">${[e.degree,e.field].filter(Boolean).map(escHtml).join(', ')}</div></div><div class="r-entry-date">${fmtDate(e.grad)}</div></div></div>`).join('')}</div>`,
        certifications: stdSections.certifications,
        languages: stdSections.languages,
        links: stdSections.links
      }, ac)}
    </div>`;
}

function buildTemplate8(d, ac) {
  const gradAc = '#764ba2';
  return `
    <div>
      <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:32px 40px;color:white;display:flex;align-items:center;gap:22px">
        ${d.photo ? `<img src="${d.photo}" style="width:88px;height:88px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.5);flex-shrink:0"/>` : ''}
        <div>
          <div style="font-size:2em;font-weight:700;color:white">${escHtml(d.fullName)||'Your Name'}</div>
          ${d.jobTitle ? `<div style="color:rgba(255,255,255,0.85);font-size:0.9em;margin-top:3px">${escHtml(d.jobTitle)}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:0.82em;color:rgba(255,255,255,0.85)">
            ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
          </div>
        </div>
      </div>
      <div style="padding:28px 40px">
        ${buildSections(d, {
          ...stdSections,
          summary: (d)=>`<div style="margin-bottom:16px"><div style="color:#764ba2;font-weight:700;font-size:0.88em;text-transform:uppercase;letter-spacing:1.5px;border-left:4px solid #764ba2;padding-left:10px;margin-bottom:8px">Summary</div><p style="color:#444;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>`,
          skills: (d)=>`<div style="margin-bottom:16px"><div style="color:#764ba2;font-weight:700;font-size:0.88em;text-transform:uppercase;letter-spacing:1.5px;border-left:4px solid #764ba2;padding-left:10px;margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:#f3f0ff;color:#764ba2;border:1px solid #ddd6fe;padding:3px 10px;border-radius:20px;font-size:0.88em">${escHtml(s)}</span>`).join('')}</div></div>`,
          experience: (d)=>`<div style="margin-bottom:16px"><div style="color:#764ba2;font-weight:700;font-size:0.88em;text-transform:uppercase;letter-spacing:1.5px;border-left:4px solid #764ba2;padding-left:10px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.title)}</div><div class="r-entry-sub">${escHtml(e.company)}</div></div><div class="r-entry-date">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>`,
          education: stdSections.education,
          certifications: stdSections.certifications,
          languages: stdSections.languages,
          links: stdSections.links
        }, gradAc)}
      </div>
    </div>`;
}

function buildTemplate9(d, ac) {
  return `
    <div style="padding:52px 60px;font-family:'Outfit',sans-serif">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px">
        <div>
          <div style="font-size:3em;font-weight:700;letter-spacing:-2px;color:#0f172a;line-height:1.1">${escHtml(d.fullName)||'Your Name'}</div>
          ${d.jobTitle ? `<div style="font-size:0.9em;color:#64748b;font-weight:400;margin-top:4px">${escHtml(d.jobTitle)}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:10px;font-size:0.8em;color:#64748b">
            ${[d.phone,d.email,d.location,...buildLinks(d)].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
          </div>
        </div>
        ${d.photo ? `<img src="${d.photo}" style="width:72px;height:72px;border-radius:50%;object-fit:cover"/>` : ''}
      </div>
      ${buildSections(d, {
        summary: (d,ac)=>`<div style="margin-bottom:20px"><div style="font-size:0.72em;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:8px">Summary</div><p style="color:#475569;line-height:1.65;font-size:0.92em">${escHtml(d.summary)}</p></div>`,
        skills: (d,ac)=>`<div style="margin-bottom:20px"><div style="font-size:0.72em;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:#f8fafc;border:1px solid #e2e8f0;padding:4px 12px;border-radius:6px;font-size:0.85em">${escHtml(s)}</span>`).join('')}</div></div>`,
        experience: (d,ac)=>`<div style="margin-bottom:20px"><div style="font-size:0.72em;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#64748b;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div style="font-weight:600">${escHtml(e.title)}</div><div style="color:#64748b;font-size:0.9em">${escHtml(e.company)}${e.location?` · ${escHtml(e.location)}`:''}</div></div><div style="font-size:0.82em;color:#94a3b8">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>`,
        education: stdSections.education,
        certifications: stdSections.certifications,
        languages: stdSections.languages,
        links: stdSections.links
      }, ac)}
    </div>`;
}

function buildTemplate10(d, ac) {
  return `
    <div>
      <div style="background:#0f172a;padding:32px 44px;display:flex;align-items:center;gap:22px">
        ${d.photo ? `<img src="${d.photo}" style="width:78px;height:78px;border-radius:50%;object-fit:cover;border:3px solid ${ac};flex-shrink:0"/>` : ''}
        <div>
          <div style="font-size:2.2em;font-weight:700;color:white">${escHtml(d.fullName)||'Your Name'}</div>
          ${d.jobTitle ? `<div style="color:${ac};font-size:0.9em;font-weight:500;margin-top:4px">${escHtml(d.jobTitle)}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:8px;font-size:0.82em;color:#94a3b8">
            ${[d.phone,d.email,d.location,...buildLinks(d)].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
          </div>
        </div>
      </div>
      <div style="padding:32px 44px">
        ${buildSections(d, {
          ...stdSections,
          skills: (d,ac)=>`<div style="margin-bottom:16px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#0f172a;border-bottom:3px solid ${ac};padding-bottom:4px;margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:${ac};color:white;padding:3px 12px;border-radius:4px;font-size:0.85em">${escHtml(s)}</span>`).join('')}</div></div>`,
        }, ac)}
      </div>
    </div>`;
}

// Templates 11-20 use simplified but distinct layouts
function buildTemplate11(d, ac) { return buildColorVariant(d, '#059669', 'left-border'); }
function buildTemplate12(d, ac) { return buildColorVariant(d, '#be123c', 'centered'); }
function buildTemplate13(d, ac) { return buildColorVariant(d, '#0d9488', 'teal-bar'); }
function buildTemplate14(d, ac) { return buildColorVariant(d, '#ea580c', 'header-color'); }
function buildTemplate15(d, ac) { return buildColorVariant(d, '#4338ca', 'serif-academic'); }
function buildTemplate16(d, ac) { return buildColorVariant(d, '#374151', 'mono'); }
function buildTemplate17(d, ac) { return buildColorVariant(d, '#1e3a5f', 'navy'); }
function buildTemplate18(d, ac) { return buildColorVariant(d, '#f59e0b', 'warm'); }
function buildTemplate19(d, ac) { return buildTemplate3(d, '#a78bfa'); } // Cyber = dark variant
function buildTemplate20(d, ac) { return buildColorVariant(d, '#000000', 'swiss'); }

// Generic builder for templates 21-50
function buildTemplateGeneric(d, tid, tac) {
  const styles = [
    'left-border','centered','header-color','teal-bar','serif-academic',
    'mono','navy','warm','swiss','left-border','centered','header-color',
    'teal-bar','serif-academic','mono','navy','warm','swiss','left-border',
    'centered','header-color','teal-bar','serif-academic','mono','navy',
    'warm','swiss','left-border','centered','header-color'
  ];
  const styleIndex = (tid - 21) % styles.length;
  return buildColorVariant(d, tac, styles[styleIndex]);
}

function buildColorVariant(d, ac, style) {
  switch(style) {
    case 'left-border': return `
      <div style="display:grid;grid-template-columns:8px 1fr;min-height:1123px">
        <div style="background:linear-gradient(to bottom,${ac},${ac}88)"></div>
        <div style="padding:40px 44px">
          ${d.photo ? `<img src="${d.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;float:right;margin-left:16px"/>` : ''}
          <div style="font-size:2.2em;font-weight:700;color:${ac}">${escHtml(d.fullName)||'Your Name'}</div>
          ${d.jobTitle ? `<div style="color:#555;font-size:0.95em">${escHtml(d.jobTitle)}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;font-size:0.85em;color:#666">
            ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
          </div>
          <hr style="border:none;height:1px;background:#e5e7eb;margin:16px 0"/>
          ${buildSections(d, mkSections(ac), ac)}
        </div>
      </div>`;
    case 'centered': return `
      <div style="padding:48px 52px">
        <div style="text-align:center;margin-bottom:20px">
          ${d.photo ? `<img src="${d.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 12px"/>` : ''}
          <div style="font-size:2.2em;font-weight:700;color:${ac}">${escHtml(d.fullName)||'Your Name'}</div>
          ${d.jobTitle ? `<div style="color:#555;font-size:0.95em;margin-top:3px">${escHtml(d.jobTitle)}</div>` : ''}
          <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:0.82em;color:#666">
            ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
          </div>
        </div>
        <hr style="border:none;height:2px;background:${ac};margin-bottom:16px"/>
        ${buildSections(d, mkSections(ac), ac)}
      </div>`;
    case 'header-color': return `
      <div>
        <div style="background:${ac};padding:32px 44px;color:white">
          <div style="display:flex;align-items:center;gap:20px">
            ${d.photo ? `<img src="${d.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.4)"/>` : ''}
            <div>
              <div style="font-size:2em;font-weight:700;color:white">${escHtml(d.fullName)||'Your Name'}</div>
              ${d.jobTitle ? `<div style="color:rgba(255,255,255,0.85);font-size:0.9em">${escHtml(d.jobTitle)}</div>` : ''}
              <div style="font-size:0.8em;color:rgba(255,255,255,0.8);margin-top:8px;display:flex;flex-wrap:wrap;gap:12px">
                ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div style="padding:28px 44px">
          ${buildSections(d, mkSections(ac), ac)}
        </div>
      </div>`;
    case 'swiss': return `
      <div style="padding:52px 60px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px">
          <div>
            <div style="font-size:3em;font-weight:300;letter-spacing:-2px;line-height:1">${escHtml(d.fullName)||'Your Name'}</div>
            ${d.jobTitle ? `<div style="font-size:0.9em;color:${ac};font-weight:500;margin-top:6px">${escHtml(d.jobTitle)}</div>` : ''}
            <div style="font-size:0.8em;color:#666;margin-top:8px;display:flex;flex-wrap:wrap;gap:14px">
              ${[d.phone,d.email,d.location].filter(Boolean).map(v=>`<span>${escHtml(v)}</span>`).join('')}
            </div>
          </div>
          ${d.photo ? `<img src="${d.photo}" style="width:80px;height:80px;border-radius:8px;object-fit:cover"/>` : ''}
        </div>
        ${buildSections(d, {
          ...mkSections(ac),
          skills: (d,ac)=>`<div style="margin-bottom:20px"><div style="font-weight:300;letter-spacing:3px;font-size:0.72em;text-transform:uppercase;border-bottom:1px solid #000;padding-bottom:4px;margin-bottom:10px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:#000;color:#fff;padding:3px 10px;border-radius:2px;font-size:0.82em">${escHtml(s)}</span>`).join('')}</div></div>`,
        }, ac)}
      </div>`;
    default: return buildTemplate1(d, ac);
  }
}

function mkSections(ac) {
  return {
    summary: (d,a)=>`<div style="margin-bottom:16px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${a};border-bottom:2px solid ${a};padding-bottom:4px;margin-bottom:8px">Summary</div><p style="color:#444;line-height:1.6;font-size:0.92em">${escHtml(d.summary)}</p></div>`,
    skills: (d,a)=>`<div style="margin-bottom:16px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${a};border-bottom:2px solid ${a};padding-bottom:4px;margin-bottom:8px">Skills</div><div style="display:flex;flex-wrap:wrap;gap:6px">${d.skills.map(s=>`<span style="background:${hexToRgba(a,0.1)};color:${a};border:1px solid ${hexToRgba(a,0.3)};padding:3px 10px;border-radius:4px;font-size:0.88em">${escHtml(s)}</span>`).join('')}</div></div>`,
    experience: (d,a)=>`<div style="margin-bottom:16px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${a};border-bottom:2px solid ${a};padding-bottom:4px;margin-bottom:8px">Experience</div>${d.experience.filter(e=>e.title||e.company).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.title)}</div><div class="r-entry-sub">${escHtml(e.company)}${e.location?` · ${escHtml(e.location)}`:''}</div></div><div class="r-entry-date">${fmtDate(e.start)}${e.start?' – ':''}${e.current?'Present':fmtDate(e.end)}</div></div>${buildBullets(e.description)}</div>`).join('')}</div>`,
    education: (d,a)=>`<div style="margin-bottom:16px"><div style="font-size:0.88em;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${a};border-bottom:2px solid ${a};padding-bottom:4px;margin-bottom:8px">Education</div>${d.education.filter(e=>e.school).map(e=>`<div class="r-entry"><div class="r-entry-header"><div><div class="r-entry-title">${escHtml(e.school)}</div><div class="r-entry-sub">${[e.degree,e.field].filter(Boolean).map(escHtml).join(', ')}</div></div><div class="r-entry-date">${fmtDate(e.grad)}</div></div></div>`).join('')}</div>`,
    certifications: stdSections.certifications,
    languages: stdSections.languages,
    links: stdSections.links
  };
}

// ============================================
// TEMPLATE MODAL
// ============================================
function buildTemplateGrid() {
  const grid = document.getElementById('templateGrid');
  grid.innerHTML = TEMPLATES.map(t => `
    <div class="template-thumb ${state.currentTemplate===t.id?'selected':''}"
         data-id="${t.id}" data-cat="${t.category}"
         onclick="selectTemplate(${t.id})">
      <div class="selected-badge">✓ Active</div>
      <span class="thumb-category">${t.category}</span>
      <div class="thumb-preview" id="thumb-${t.id}"></div>
      <div class="thumb-label">${t.name}</div>
    </div>
  `).join('');

  // Render mini previews after a tick
  setTimeout(() => {
    TEMPLATES.forEach(t => {
      const container = document.getElementById(`thumb-${t.id}`);
      if (!container) return;
      const mini = document.createElement('div');
      mini.className = `resume-preview template-${t.id}`;
      mini.style.cssText = `width:794px;min-height:400px;background:white;color:#1a1a1a;font-size:12px;pointer-events:none`;
      const tac = TEMPLATE_ACCENTS[t.id] || state.customization.color;
      mini.style.setProperty('--accent', tac);
      mini.style.fontFamily = "'DM Sans',sans-serif";
      mini.innerHTML = getSampleHTML(t.id, tac);
      container.appendChild(mini);
    });
  }, 100);
}

function getSampleHTML(tid, ac) {
  const d = {
    fullName:'Alex Johnson', jobTitle:'Software Engineer',
    phone:'+1 555 0100', email:'alex@example.com', location:'San Francisco',
    summary:'Results-driven developer with 3+ years of experience.',
    skills:['Python','JavaScript','React'],
    experience:[{title:'Senior Developer',company:'TechCorp',location:'SF',start:'2022-01',end:'',current:true,description:'• Built scalable APIs\n• Led team of 5 engineers'}],
    education:[{school:'UC Berkeley',degree:'B.Sc.',field:'Computer Science',location:'Berkeley',grad:'2021-05'}],
    certifications:[{name:'AWS Certified',issuer:'Amazon',date:'2023-03'}],
    languages:[{language:'English',level:'Native'}],
    links:[],photo:null
  };
  // Use the template builders
  try {
    if (tid <= 1) return buildTemplate1(d, ac);
    if (tid === 2) return buildTemplate2(d, ac);
    if (tid === 3) return buildTemplate3(d, ac);
    if (tid === 4) return buildTemplate4(d, ac);
    if (tid === 5) return buildTemplate5(d, ac);
    if (tid === 6) return buildTemplate6(d, ac);
    if (tid === 7) return buildTemplate7(d, ac);
    if (tid === 8) return buildTemplate8(d, ac);
    if (tid === 9) return buildTemplate9(d, ac);
    if (tid === 10) return buildTemplate10(d, ac);
    return buildColorVariant(d, ac, ['left-border','centered','header-color','teal-bar','swiss'][(tid-11)%5]);
  } catch(e) { return buildTemplate1(d, ac); }
}

function selectTemplate(id) {
  state.currentTemplate = id;
  document.querySelectorAll('.template-thumb').forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.id) === id);
  });
  updatePreview();
  closeModal('templateModal');
}

function filterTemplates(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.template-thumb').forEach(el => {
    el.style.display = (cat === 'all' || el.dataset.cat === cat) ? '' : 'none';
  });
}

function openTemplateModal() {
  document.getElementById('templateModal').classList.add('open');
}

// ============================================
// CUSTOMIZE MODAL
// ============================================
function openCustomizeModal() {
  document.getElementById('customizeModal').classList.add('open');
}

function applyCustomization() {
  state.customization.font = document.getElementById('fontFamily').value;
  state.customization.fontSize = parseInt(document.getElementById('fontSize').value);
  updatePreview();
}

function setColor(hex, swatchEl) {
  state.customization.color = hex;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  if (swatchEl) swatchEl.classList.add('active');
  document.getElementById('customColor').value = hex;
  updatePreview();
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ============================================
// SORTABLE SECTION ORDER
// ============================================
function initSortable() {
  const list = document.getElementById('sectionOrderList');
  if (typeof Sortable !== 'undefined') {
    Sortable.create(list, {
      animation: 150,
      handle: '.drag-handle',
      ghostClass: 'sortable-ghost',
      onEnd: () => {
        const items = list.querySelectorAll('.order-item');
        state.sectionOrder = Array.from(items).map(el => el.dataset.sec);
        updatePreview();
      }
    });
  }
}

// ============================================
// ZOOM
// ============================================
let currentZoom = 0.9;
function setZoom(z) {
  currentZoom = Math.max(0.4, Math.min(1.5, z));
  document.getElementById('previewWrapper').style.transform = `scale(${currentZoom})`;
  document.getElementById('zoomLevel').textContent = Math.round(currentZoom * 100) + '%';
}
function zoomPreview(delta) { setZoom(currentZoom + delta); }

// ============================================
// PDF DOWNLOAD
// ============================================
function downloadPDF() {
  const el = document.getElementById('resumePreview');
  const name = val('fullName') || 'Resume';
  const opt = {
    margin:       [0, 0, 0, 0],
    filename:     `${name.replace(/\s+/g,'_')}_Resume.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, allowTaint: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all','css','legacy'] }
  };
  // Temporarily reset transform
  const wrapper = document.getElementById('previewWrapper');
  const savedTransform = wrapper.style.transform;
  wrapper.style.transform = 'none';
  const btn = document.querySelector('.btn-primary');
  btn.textContent = '⏳ Generating...';
  btn.disabled = true;
  html2pdf().set(opt).from(el).save().then(() => {
    wrapper.style.transform = savedTransform;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF`;
    btn.disabled = false;
  }).catch(err => {
    wrapper.style.transform = savedTransform;
    btn.innerHTML = 'Download PDF';
    btn.disabled = false;
    console.error('PDF error:', err);
  });
}

// ============================================
// UTILS
// ============================================
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}
