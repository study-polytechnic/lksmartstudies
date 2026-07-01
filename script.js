/* ==========================================================
   LK SMART STUDIES — script.js
   Connects to index.html (renders into #subjectGrid, #notesList)
   and uses the same class names defined in style.css so the
   markup this script generates is styled automatically.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- Data: subjects by class ---------------- */
  const SUBJECTS = {
    9: [
      { name: "Mathematics", icon: "📐", desc: "Number systems se lekar coordinate geometry tak, formula sheet ke saath." },
      { name: "Science", icon: "🧪", desc: "Physics, Chemistry, Biology — teeno ek jagah, diagram ke saath." },
      { name: "Social Science", icon: "🌍", desc: "History, Geography, Civics aur Economics ke short notes." },
      { name: "English", icon: "📖", desc: "Beehive aur Moments ke chapter summary + grammar practice." },
      { name: "Hindi", icon: "✒️", desc: "Kshitij aur Kritika ke paath-saar, vyakaran ke साथ." },
      { name: "Computer App.", icon: "💻", desc: "Basics of IT, cyber safety aur practical file ready-made." }
    ],
    10: [
      { name: "Mathematics", icon: "📐", desc: "Trigonometry, statistics aur probability — board pattern mein solved." },
      { name: "Science", icon: "🧪", desc: "Chemical reactions se electricity tak, sabhi NCERT diagrams." },
      { name: "Social Science", icon: "🌍", desc: "Nationalism, resources aur political science ka fast revision." },
      { name: "English", icon: "📖", desc: "First Flight aur Footprints without Feet — summary + Q&A bank." },
      { name: "Hindi", icon: "✒️", desc: "Sparsh aur Sanchayan ke notes, likhit abhivyakti ke tips." },
      { name: "Computer App.", icon: "💻", desc: "HTML basics, database concepts aur networking simplified." }
    ],
    11: [
      { name: "Mathematics", icon: "📐", desc: "Sets, functions aur limits — concept clarity ke saath practice sets." },
      { name: "Physics", icon: "🧲", desc: "Mechanics aur thermodynamics ke derivations, step-by-step." },
      { name: "Chemistry", icon: "🧪", desc: "Organic chemistry ke reaction maps aur periodic trends." },
      { name: "Biology", icon: "🧬", desc: "Cell structure se plant physiology tak, labelled diagrams." },
      { name: "Accountancy", icon: "📒", desc: "Journal entries aur ledger practice, easy examples ke saath." },
      { name: "English", icon: "📖", desc: "Hornbill aur Snapshots ke summary, writing skills section." }
    ],
    12: [
      { name: "Mathematics", icon: "📐", desc: "Calculus aur vectors — board ke pichhle 10 saal ke patterns par based." },
      { name: "Physics", icon: "🧲", desc: "Electrodynamics aur optics, numericals solved step-by-step." },
      { name: "Chemistry", icon: "🧪", desc: "Electrochemistry, polymers aur biomolecules — revision charts." },
      { name: "Biology", icon: "🧬", desc: "Genetics, evolution aur ecology, exam-oriented short notes." },
      { name: "Business Studies", icon: "💼", desc: "Principles of management aur marketing, case studies ke saath." },
      { name: "English", icon: "📖", desc: "Vistas ke summary + long/short answer practice bank." }
    ]
  };

  const NOTES = [
    { tag: "NEW", title: "Class 10 Science — Chemical Reactions ka quick-revision chart", meta: "PDF · 2 din pehle" },
    { tag: "NEW", title: "Class 12 Physics — Electrostatics numericals (solved)", meta: "PDF · 3 din pehle" },
    { tag: "PYQ", title: "Class 9 Maths — 2019–2024 tak ke sabhi sample paper", meta: "PDF · 5 din pehle" },
    { tag: "NEW", title: "Class 11 Accountancy — Ledger posting practice sheet", meta: "PDF · 1 hafta pehle" },
    { tag: "PYQ", title: "Class 12 Business Studies — Board previous year Qs", meta: "PDF · 1 hafta pehle" }
  ];

  /* ---------------- Render subject cards ---------------- */
  const grid = document.getElementById("subjectGrid");
  const tabs = document.querySelectorAll(".tab");
  const searchInput = document.getElementById("subjectSearch");
  let currentClass = "9";

  function renderSubjects() {
    const query = searchInput.value.trim().toLowerCase();
    const list = SUBJECTS[currentClass].filter(s =>
      s.name.toLowerCase().includes(query)
    );

    grid.innerHTML = "";

    if (list.length === 0) {
      grid.innerHTML = `<p class="no-results">Is naam ka koi subject nahi mila. Kuch aur try karo.</p>`;
      return;
    }

    list.forEach(subject => {
      const card = document.createElement("article");
      card.className = "subject-card";
      card.innerHTML = `
        <div class="tape"></div>
        <span class="icon" aria-hidden="true">${subject.icon}</span>
        <h3>${subject.name}</h3>
        <p>${subject.desc}</p>
        <a href="#notes">Class ${currentClass} notes dekho →</a>
      `;
      grid.appendChild(card);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      currentClass = tab.dataset.class;
      renderSubjects();
    });
  });

  searchInput.addEventListener("input", renderSubjects);

  renderSubjects();

  /* ---------------- Render latest notes ---------------- */
  const notesList = document.getElementById("notesList");
  NOTES.forEach(note => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="chk">${note.tag}</span>
      <span>${note.title}</span>
      <span class="meta">${note.meta}</span>
    `;
    notesList.appendChild(li);
  });

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Contact form (demo only) ---------------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Shukriya! Aapka message note kar liya gaya — hum jaldi reply karenge.";
    contactForm.reset();
  });

  /* ---------------- Back to top button ---------------- */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- Footer year ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
                          
