/* ==========================================================
   एलके स्मार्ट स्टडीज़ — script.js
   यह index.html से जुड़ा है (डेटा #subjectGrid और #notesList में
   भरता है) और वही क्लास नाम इस्तेमाल करता है जो style.css में
   पहले से बने हैं, इसलिए जो भी markup यहाँ बनता है वह अपने आप
   सही तरीके से styled दिखता है।
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- डेटा: कक्षा के अनुसार विषय ---------------- */
  const SUBJECTS = {
    9: [
      { name: "गणित", icon: "📐", desc: "संख्या पद्धति से लेकर निर्देशांक ज्यामिति तक, फ़ॉर्मूला शीट के साथ।" },
      { name: "विज्ञान", icon: "🧪", desc: "भौतिकी, रसायन विज्ञान, जीव विज्ञान — तीनों एक जगह, चित्रों के साथ।" },
      { name: "सामाजिक विज्ञान", icon: "🌍", desc: "इतिहास, भूगोल, नागरिक शास्त्र और अर्थशास्त्र के संक्षिप्त नोट्स।" },
      { name: "अंग्रेज़ी", icon: "📖", desc: "Beehive और Moments के अध्यायों का सार व व्याकरण अभ्यास।" },
      { name: "हिंदी", icon: "✒️", desc: "क्षितिज और कृतिका के पाठ-सार, व्याकरण के साथ।" },
      { name: "कंप्यूटर एप्लिकेशन", icon: "💻", desc: "IT की मूल बातें, साइबर सुरक्षा और तैयार प्रैक्टिकल फ़ाइल।" }
    ],
    10: [
      { name: "गणित", icon: "📐", desc: "त्रिकोणमिति, सांख्यिकी और प्रायिकता — बोर्ड पैटर्न में हल किए हुए।" },
      { name: "विज्ञान", icon: "🧪", desc: "रासायनिक अभिक्रियाओं से बिजली तक, सभी NCERT चित्रों के साथ।" },
      { name: "सामाजिक विज्ञान", icon: "🌍", desc: "राष्ट्रवाद, संसाधन और राजनीति विज्ञान का त्वरित रिवीज़न।" },
      { name: "अंग्रेज़ी", icon: "📖", desc: "First Flight और Footprints without Feet — सार व प्रश्नोत्तर बैंक।" },
      { name: "हिंदी", icon: "✒️", desc: "स्पर्श और संचयन के नोट्स, लिखित अभिव्यक्ति के टिप्स के साथ।" },
      { name: "कंप्यूटर एप्लिकेशन", icon: "💻", desc: "HTML की मूल बातें, डेटाबेस अवधारणाएँ और नेटवर्किंग सरल भाषा में।" }
    ],
    11: [
      { name: "गणित", icon: "📐", desc: "समुच्चय, फलन और लिमिट — स्पष्टता के साथ अभ्यास सेट।" },
      { name: "भौतिकी", icon: "🧲", desc: "यांत्रिकी और ऊष्मागतिकी के व्युत्पादन, चरण-दर-चरण।" },
      { name: "रसायन विज्ञान", icon: "🧪", desc: "कार्बनिक रसायन विज्ञान के अभिक्रिया मानचित्र और आवर्त रुझान।" },
      { name: "जीव विज्ञान", icon: "🧬", desc: "कोशिका संरचना से पादप कार्यिकी तक, लेबल किए हुए चित्र।" },
      { name: "लेखाशास्त्र", icon: "📒", desc: "जर्नल एंट्री और लेजर अभ्यास, आसान उदाहरणों के साथ।" },
      { name: "अंग्रेज़ी", icon: "📖", desc: "Hornbill और Snapshots का सार, लेखन कौशल अनुभाग।" }
    ],
    12: [
      { name: "गणित", icon: "📐", desc: "कैलकुलस और सदिश — पिछले 10 वर्षों के बोर्ड पैटर्न पर आधारित।" },
      { name: "भौतिकी", icon: "🧲", desc: "विद्युतगतिकी और प्रकाशिकी, संख्यात्मक प्रश्न हल किए हुए।" },
      { name: "रसायन विज्ञान", icon: "🧪", desc: "वैद्युतरसायन, बहुलक और जैव-अणु — रिवीज़न चार्ट।" },
      { name: "जीव विज्ञान", icon: "🧬", desc: "आनुवंशिकी, विकास और परिस्थितिकी, परीक्षा-केंद्रित संक्षिप्त नोट्स।" },
      { name: "व्यवसाय अध्ययन", icon: "💼", desc: "प्रबंधन के सिद्धांत और मार्केटिंग, केस स्टडी के साथ।" },
      { name: "अंग्रेज़ी", icon: "📖", desc: "Vistas का सार व दीर्घ/संक्षिप्त उत्तर अभ्यास बैंक।" }
    ]
  };

  const NOTES = [
    { tag: "नया", title: "कक्षा 10 विज्ञान — रासायनिक अभिक्रियाओं का त्वरित-रिवीज़न चार्ट", meta: "PDF · 2 दिन पहले" },
    { tag: "नया", title: "कक्षा 12 भौतिकी — इलेक्ट्रोस्टेटिक्स के संख्यात्मक प्रश्न (हल किए हुए)", meta: "PDF · 3 दिन पहले" },
    { tag: "पिछले वर्ष", title: "कक्षा 9 गणित — 2019–2024 तक के सभी सैंपल पेपर", meta: "PDF · 5 दिन पहले" },
    { tag: "नया", title: "कक्षा 11 लेखाशास्त्र — लेजर पोस्टिंग अभ्यास शीट", meta: "PDF · 1 हफ़्ता पहले" },
    { tag: "पिछले वर्ष", title: "कक्षा 12 व्यवसाय अध्ययन — बोर्ड के पिछले वर्षों के प्रश्न", meta: "PDF · 1 हफ़्ता पहले" }
  ];

  /* ---------------- विषय कार्ड बनाना ---------------- */
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
      grid.innerHTML = `<p class="no-results">इस नाम का कोई विषय नहीं मिला। कुछ और खोजो।</p>`;
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
        <a href="#notes">कक्षा ${currentClass} के नोट्स देखो →</a>
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

  /* ---------------- नए नोट्स बनाना ---------------- */
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

  /* ---------------- मोबाइल नेवीगेशन ---------------- */
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

  /* ---------------- संपर्क फ़ॉर्म (डेमो) ---------------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "शुक्रिया! आपका संदेश दर्ज कर लिया गया है — हम जल्दी जवाब देंगे।";
    contactForm.reset();
  });

  /* ---------------- ऊपर जाने का बटन ---------------- */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------- फ़ुटर में साल ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
