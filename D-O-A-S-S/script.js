/* ===============================
   RANDOM BACKGROUND
================================ */
const isSubPage = window.location.pathname.includes("/subs/");
const basePath = isSubPage ? "../source/" : "source/";

const images = [
  "marjan-blan-_kUxT8WkoeY-unsplash.jpg",
  "marjan-blan-_kUxT8WkoeY-unsplash(1).jpg",
  "marjan-blan--Vc-ok8CeBU-unsplash.jpg",
  "marjan-blan-5Ft4NWTmeJE-unsplash.jpg",
  "marjan-blan-5Ft4NWTmeJE-unsplash(1).jpg",
  "marjan-blan-6CeiUegNFiE-unsplash.jpg",
  "marjan-blan-40M5j2ygjnw-unsplash.jpg",
  "marjan-blan-794QUz5-cso-unsplash.jpg",
  "marjan-blan-ADfPdLBMeY8-unsplash.jpg",
  "marjan-blan-GOP07ZOjBEU-unsplash.jpg",
  "marjan-blan-qqz06qPB_F0-unsplash.jpg",
].map(img => basePath + img);

document.body.style.backgroundImage =
  `url("${images[Math.floor(Math.random() * images.length)]}")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";


/* ===============================
   ENTRY LOGIC
================================ */
const entries = document.querySelectorAll(".entry");
const isMainPage = document.querySelector('input[name="entry"]') !== null;

let currentIndex = 0;
let radios, prevBtn, nextBtn, dayIndicator;

if (isMainPage) {
  radios = document.querySelectorAll('input[name="entry"]');
  prevBtn = document.getElementById("prev");
  nextBtn = document.getElementById("next");
  dayIndicator = document.getElementById("dayIndicator");
}


/* ===============================
   TYPEWRITER FUNCTIONS
================================ */
function typeByLetter(p, speed = 20) {
  const html = p.dataset.text;
  p.innerHTML = "";

  const container = document.createElement("div");
  container.innerHTML = html;
  const nodes = Array.from(container.childNodes);

  let nodeIndex = 0;

  function typeNode() {
    if (nodeIndex >= nodes.length) return;

    const node = nodes[nodeIndex];

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      let charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          const span = document.createElement("span");
          span.textContent = text[charIndex];
          p.appendChild(span);
          setTimeout(() => span.classList.add("visible"), 10);
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          nodeIndex++;
          typeNode();
        }
      }

      typeChar();
    } else if (node.nodeName === "BR") {
      p.appendChild(document.createElement("br"));
      nodeIndex++;
      setTimeout(typeNode, speed);
    } else if (node.nodeName === "A") {
      // create a link and type letters inside it
      const link = document.createElement("a");
      link.href = node.href;
      p.appendChild(link);

      const text = node.textContent;
      let charIndex = 0;

      function typeLinkChar() {
        if (charIndex < text.length) {
          link.textContent += text[charIndex];
          charIndex++;
          setTimeout(typeLinkChar, speed);
        } else {
          nodeIndex++;
          setTimeout(typeNode, speed);
        }
      }

      typeLinkChar();
    } else {
      // other elements like <strong>, <em>
      const clone = node.cloneNode(true);
      p.appendChild(clone);
      nodeIndex++;
      setTimeout(typeNode, speed);
    }
  }

  typeNode();
}

function typeByWord(p, speed = 100) {
  const html = p.dataset.text;
  p.innerHTML = "";

  const container = document.createElement("div");
  container.innerHTML = html;
  const nodes = Array.from(container.childNodes);

  let nodeIndex = 0;

  function typeNode() {
    if (nodeIndex >= nodes.length) return;

    const node = nodes[nodeIndex];

    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/(\s+)/);
      let wordIndex = 0;

      function typeWordFunc() {
        if (wordIndex < words.length) {
          const span = document.createElement("span");
          span.textContent = words[wordIndex];
          p.appendChild(span);
          span.classList.add("visible");
          wordIndex++;
          setTimeout(typeWordFunc, speed);
        } else {
          nodeIndex++;
          setTimeout(typeNode, speed);
        }
      }

      typeWordFunc();
    } else if (node.nodeName === "BR") {
      p.appendChild(document.createElement("br"));
      nodeIndex++;
      setTimeout(typeNode, speed);
    } else if (node.nodeName === "A") {
      const link = document.createElement("a");
      link.href = node.href;
      p.appendChild(link);

      const words = node.textContent.split(/(\s+)/);
      let wordIndex = 0;

      function typeLinkWord() {
        if (wordIndex < words.length) {
          link.textContent += words[wordIndex];
          wordIndex++;
          setTimeout(typeLinkWord, speed);
        } else {
          nodeIndex++;
          setTimeout(typeNode, speed);
        }
      }

      typeLinkWord();
    } else {
      const clone = node.cloneNode(true);
      p.appendChild(clone);
      nodeIndex++;
      setTimeout(typeNode, speed);
    }
  }

  typeNode();
}

function typeByLine(p, speed = 500) {
  const html = p.dataset.text.trim();
  const lines = html.replace(/<br\s*\/?>/gi, "\n").split("\n").map(l => l.trim()).filter(l => l !== "");
  p.innerHTML = "";
  let i = 0;
  function type() {
    if (i < lines.length) {
      p.insertAdjacentHTML("beforeend", lines[i] + "<br>");
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function typeRowLetters(p, speed = 500) {
  const html = p.dataset.text;
  const rows = html.split(/\n|<br\s*\/?>/);
  p.innerHTML = "";
  let i = 0;
  function type() {
    if (i < rows.length) {
      p.innerHTML += rows[i] + "<br>";
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function typeByLetterPerRow(p, speed = 20) {
  const html = p.dataset.text;
  const rows = html.split(/\n|<br\s*\/?>/);
  p.innerHTML = "";
  let rowIndex = 0;
  let charIndex = 0;
  function type() {
    if (rowIndex < rows.length) {
      const row = rows[rowIndex];
      if (charIndex < row.length) {
        p.innerHTML += row[charIndex];
        charIndex++;
        setTimeout(type, speed);
      } else {
        p.innerHTML += "<br>";
        charIndex = 0;
        rowIndex++;
        setTimeout(type, speed);
      }
    }
  }
  type();
}


/* ===============================
   SHOW ENTRY
================================ */
function showEntry(index) {
  if (index < 0 || index >= entries.length) return;

  entries.forEach((entry, i) => {
    entry.classList.toggle("active", i === index);

    if (i === index) {
      const p = entry.querySelector("p");
      if (!p.dataset.text) p.dataset.text = p.innerHTML;
      p.innerHTML = "";

      switch (entry.dataset.type) {
        case "word":
          typeByWord(p);
          break;
        case "line":
          typeByLine(p);
          break;
        case "row":
          typeRowLetters(p);
          break;
        case "letterPerRow":
          typeByLetterPerRow(p);
          break;
        default:
          typeByLetter(p);
      }
    }
  });

  currentIndex = index;
  if (dayIndicator) dayIndicator.textContent = `Day ${index + 1}`;
  if (radios) radios[index].checked = true;

  // remember last read entry
  localStorage.setItem("lastEntryIndex", index);

  // update subpage links
  updateSubLinks();
}

function updateSubLinks() {
  const activeEntry = entries[currentIndex];
  if (!activeEntry) return;
  const entryId = activeEntry.id;

  const links = activeEntry.querySelectorAll('a[href^="subs/"]');
  links.forEach(link => {
    const url = new URL(link.getAttribute("href"), window.location.origin);
    url.searchParams.set("from", entryId);
    link.setAttribute("href", url.pathname + url.search);
  });
}


/* ===============================
   NAVIGATION
================================ */
if (isMainPage) {
  prevBtn.addEventListener("click", () => showEntry(Math.max(currentIndex - 1, 0)));
  nextBtn.addEventListener("click", () => showEntry(Math.min(currentIndex + 1, entries.length - 1)));

  radios.forEach((radio, index) => radio.addEventListener("change", () => showEntry(index)));

  document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.replace("#", "");
    let startIndex = 0;

    if (hash) {
      const hashIndex = [...entries].findIndex(e => e.id === hash);
      if (hashIndex !== -1) startIndex = hashIndex;
    } else {
      const savedIndex = localStorage.getItem("lastEntryIndex");
      if (savedIndex !== null) startIndex = parseInt(savedIndex, 10);
    }

    showEntry(startIndex);
  });
}

/* ===============================
   KEYBOARD NAVIGATION
================================ */
if (isMainPage) {
  document.addEventListener("keydown", e => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (e.key === "ArrowLeft") showEntry(Math.max(currentIndex - 1, 0));
    if (e.key === "ArrowRight") showEntry(Math.min(currentIndex + 1, entries.length - 1));
  });
}

/* ===============================
   AUTO TYPEWRITER FOR SUB PAGES
================================ */
if (!isMainPage) {
  document.addEventListener("DOMContentLoaded", () => {
    const entry = document.querySelector(".entry");
    if (!entry) return;

    const p = entry.querySelector("p");
    if (!p) return;

    if (!p.dataset.text) p.dataset.text = p.innerHTML;
    p.innerHTML = "";

    switch (entry.dataset.type) {
      case "word":
        typeByWord(p);
        break;
      case "line":
        typeByLine(p);
        break;
      case "row":
        typeRowLetters(p);
        break;
      case "letterPerRow":
        typeByLetterPerRow(p);
        break;
      default:
        typeByLetter(p);
    }
  });
}
