import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "https://cdn.skypack.dev/gsap";

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load(
  "/demon_bee_full_texture.glb",
  function (gltf) {
    bee = gltf.scene;
    scene.add(bee);

    mixer = new THREE.AnimationMixer(bee);
    mixer.clipAction(gltf.animations[0]).play();
    modelMove();
  },
  function (xhr) {},
  function (error) {}
);

const stickySection = [...document.querySelectorAll(".sticky")];

let images = ["Image/flower.png", "Image/leaf.png", "Image/leaf1.png"];

images.forEach((imgSrc) => {
  stickySection.forEach((section) => {
    let image = document.createElement("img");
    image.src = imgSrc; // Assign the correct image source

    section.querySelector(".scroll-section").appendChild(image);
  });
});

// Remove specific unwanted images
const unwantedImages = [
  document.querySelector("body > main > div > div > div > img:nth-child(4)"),
  document.querySelector("body > main > div > div > div > img:nth-child(5)"),
  document.querySelector("body > main > div > div > div > img:nth-child(6)"),
];

unwantedImages.forEach((img) => {
  if (img) {
    // Check if the image exists
    img.remove(); // Remove the image from the DOM
  }
});

window.addEventListener("scroll", (e) => {
  for (let i = 0; i < stickySection.length; i++) {
    transform(stickySection[i]);
  }
});

function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector(".scroll-section");
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
  scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
}
