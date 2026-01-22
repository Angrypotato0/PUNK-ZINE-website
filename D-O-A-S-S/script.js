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
const isMainPage = entries.length > 0;

let currentIndex = 0;
let radios, prevBtn, nextBtn, dayIndicator;

if (isMainPage) {
  radios = document.querySelectorAll('input[name="entry"]');
  prevBtn = document.getElementById("prev");
  nextBtn = document.getElementById("next");
  dayIndicator = document.getElementById("dayIndicator");
}


/* ===============================
   TYPEWRITER VARIATIONS
================================ */

/**
 * 1️⃣ Letter-by-letter (classic)
 */
function typeByLetter(p, speed = 20) {
  const html = p.dataset.text;
  p.innerHTML = "";
  let i = 0;

  function type() {
    if (i < html.length) {
      const span = document.createElement("span");
      span.textContent = html[i];
      p.appendChild(span);

      // trigger fade-in
      setTimeout(() => span.classList.add("visible"), 20);

      i++;
      setTimeout(type, speed);
    }
  }

  type();
}


/**
 * 2️⃣ Word-by-word
 */
function typeByWord(p, speed = 100) {
  const html = p.dataset.text;
  p.innerHTML = "";

  // Parse the HTML into nodes (text nodes and elements)
  const container = document.createElement("div");
  container.innerHTML = html;
  const nodes = Array.from(container.childNodes); // text nodes or <a> elements

  let i = 0;

  function typeNode() {
    if (i < nodes.length) {
      const node = nodes[i];

      if (node.nodeType === Node.TEXT_NODE) {
        // split text node into words
        const words = node.textContent.split(/(\s+)/);
        let j = 0;

        function typeWord() {
          if (j < words.length) {
            const word = words[j];
            const span = document.createElement("span");
            span.textContent = word;
            span.classList.add("visible");
            p.appendChild(span);
            j++;
            setTimeout(typeWord, speed);
          } else {
            i++;
            typeNode(); // next node
          }
        }

        typeWord();
      } else {
        // node is an element (<a>, <strong>, etc.)
        const clone = node.cloneNode(true);
        p.appendChild(clone);
        i++;
        setTimeout(typeNode, speed);
      }
    }
  }

  typeNode();
}




/**
 * 3️⃣ Line-by-line (splits on <br> or newlines)
 */
function typeByLine(p, speed = 500) {
  const html = p.dataset.text;
  const lines = html.split(/\n|<br\s*\/?>/);
  p.innerHTML = "";
  let i = 0;

  function type() {
    if (i < lines.length) {
      p.innerHTML += lines[i] + "<br>";
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/**
 * 4️⃣ Row of letters (all letters of a row at once)
 */
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

/**
 * 5️⃣ Letter-by-letter per row
 */
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
  entries.forEach((entry, i) => {
    entry.classList.toggle("active", i === index);

    if (i === index) {
      const p = entry.querySelector("p");

      if (!p.dataset.text) {
        p.dataset.text = p.innerHTML;
      }

      p.textContent = "";

      // Select typewriter based strictly on data-type
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
}



/* ===============================
   NAVIGATION
================================ */
if (isMainPage) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) showEntry(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < entries.length - 1) showEntry(currentIndex + 1);
  });

  radios.forEach((radio, index) => {
    radio.addEventListener("change", () => showEntry(index));
  });

  showEntry(0);
}


/* ===============================
   KEYBOARD NAVIGATION
================================ */
if (isMainPage) {
  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      showEntry(currentIndex - 1);
    }

    if (e.key === "ArrowRight" && currentIndex < entries.length - 1) {
      showEntry(currentIndex + 1);
    }
  });
}


/* ===============================
   REMEMBER ENTRY LOGIN (HASH LINKS)
================================ */
if (isMainPage) {
  window.addEventListener("load", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const index = [...entries].findIndex(e => e.id === hash);
      if (index !== -1) {
        showEntry(index);
      }
    }
  });
}
