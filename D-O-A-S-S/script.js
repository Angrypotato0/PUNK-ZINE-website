/* ===============================
   RANDOM BACKGROUND
================================ */
const images = [
  "source/marjan-blan-_kUxT8WkoeY-unsplash.jpg",
  "source/marjan-blan-_kUxT8WkoeY-unsplash(1).jpg",
  "source/marjan-blan--Vc-ok8CeBU-unsplash.jpg",
  "source/marjan-blan-5Ft4NWTmeJE-unsplash.jpg",
  "source/marjan-blan-5Ft4NWTmeJE-unsplash(1).jpg",
  "source/marjan-blan-6CeiUegNFiE-unsplash.jpg",
  "source/marjan-blan-40M5j2ygjnw-unsplash.jpg",
  "source/marjan-blan-794QUz5-cso-unsplash.jpg",
  "source/marjan-blan-ADfPdLBMeY8-unsplash.jpg",
  "source/marjan-blan-GOP07ZOjBEU-unsplash.jpg",
  "source/marjan-blan-qqz06qPB_F0-unsplash.jpg",
];

document.body.style.backgroundImage =
  `url("${images[Math.floor(Math.random() * images.length)]}")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";

/* ===============================
   ENTRY LOGIC
================================ */
const entries = document.querySelectorAll(".entry");
const radios = document.querySelectorAll('input[name="entry"]');
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dayIndicator = document.getElementById("dayIndicator");

let currentIndex = 0;

/* ===============================
   TYPEWRITER
================================ */
function typeParagraph(p, speed = 40) {
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
