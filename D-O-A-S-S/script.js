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

const randomImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url("${randomImage}")`;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center";
