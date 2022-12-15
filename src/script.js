import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Creation of environment steps:
 * 1. Add GUI (optional)
 * 2. Create Canvas
 * 3. Create Scene
 * 4. Create a TextureLoader
 * 5. Geometry, material then mesh (which you need to add the geometry and material)
 * 6. Add Mesh to the scene
 * 7. Create a Size object that stores the desired height & width of the canvas
 *      a. add an eventlistener to adjust size of canvas based on resizing of the windows
 * 8. Create a Camera and set the position
 * 9. add camera to scene
 * 10. Create a control and enableDamping
 * 11. Create a new Render that was call the canvas you are calling from the html
 *      a. setSize of render by calling thw width and height set in the sizes object
 *      b. set the pixelRation renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 * 12. create a tick function to update controls based on mouse movements
 */
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const fontLoader = new FontLoader();
fontLoader.load("/fonts/optimer_bold.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Yande", {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  const textGeometry2 = new TextGeometry("C/O", {
    font: font,
    size: 0.075,
    height: 0.1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  const textGeometry3 = new TextGeometry("*  Richard Nyande  *", {
    font: font,
    size: 0.1,
    height: 0.1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
  const matcapTexture2 = textureLoader.load("/textures/matcaps/8.png");
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const material2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });
  const text = new THREE.Mesh(textGeometry, material);
  const text2 = new THREE.Mesh(textGeometry2, material);
  const text3 = new THREE.Mesh(textGeometry3, material);
  scene.add(text);
  scene.add(text2);
  scene.add(text3);
  textGeometry.computeBoundingBox();
  textGeometry.center();
  textGeometry2.computeBoundingBox();
  textGeometry2.translate(
    -(textGeometry2.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
    -(textGeometry2.boundingBox.max.y + 0.75) * 0.5, // Subtract bevel size
    -(textGeometry2.boundingBox.max.z - 0.03) * 0.5 // Subtract bevel thickness
  );
  textGeometry3.computeBoundingBox();
  textGeometry3.translate(
    -(textGeometry3.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
    -(textGeometry3.boundingBox.max.y + 1.1) * 0.5, // Subtract bevel size
    -(textGeometry3.boundingBox.max.z - 0.03) * 0.5 // Subtract bevel thickness
  );

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    scene.add(donut);
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
  }
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.background = new THREE.Color(0xffffff);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
