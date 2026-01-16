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
   TYPEWRITER
================================ */
function typeParagraph(p, speed = 20) {
  const html = p.dataset.text;
  p.innerHTML = "";

  let i = 0;
  let isTag = false;
  let output = "";

  function type() {
    if (i < html.length) {
      const char = html[i];

      if (char === "<") isTag = true;
      if (!isTag) output += char;

      if (char === ">") {
        isTag = false;
        output += html.slice(html.lastIndexOf("<", i), i + 1);
      }

      p.innerHTML = output;
      i++;
      setTimeout(type, speed);
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
        p.dataset.text =  p.innerHTML;
      }

      p.textContent = "";
      typeParagraph(p);
    }
  });

  currentIndex = index;
  dayIndicator.textContent = `Day ${index + 1}`;
  radios[index].checked = true;
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
document.addEventListener("keydown", (e) => {
  // prevent interfering with inputs
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

  if (e.key === "ArrowLeft") {
    if (currentIndex > 0) {
      showEntry(currentIndex - 1);
    }
  }

  if (e.key === "ArrowRight") {
    if (currentIndex < entries.length - 1) {
      showEntry(currentIndex + 1);
    }
  }
});

/* ===============================
   REMEMBER ENTRY LOGIN
================================ */
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const index = [...entries].findIndex(e => e.id === hash);
    if (index !== -1) {
      showEntry(index);
    }
  }
});