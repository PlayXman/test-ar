import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshPhysicalMaterial,
    Mesh,
    Color,
    DirectionalLight,
    AmbientLight, PlaneGeometry, ShadowMaterial,
} from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new Scene();
scene.background = new Color(0xf1f1f1)

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableKeys = false;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI/2;
controls.minDistance = 1.5; //so you can't go inside model (needs a test)
controls.maxDistance = 10; //so you can't unzoom to infinity (maybe not needed, just looks good)

const box = new BoxGeometry();
const material = new MeshPhysicalMaterial({
    color: 0xffffff
});
const cube = new Mesh(box, material);
scene.add(cube);
cube.castShadow = true;

const plane = new PlaneGeometry(100, 100, 1, 1);
const planeMat = new ShadowMaterial();
const planeMesh = new Mesh(plane, planeMat);
scene.add(planeMesh);
planeMat.opacity = 0.2;
planeMesh.receiveShadow = true;
planeMesh.position.y = -0.5;
planeMesh.rotation.x = -Math.PI/2;

const directionalLight = new DirectionalLight(0xffffff, 0.25);
directionalLight.castShadow = true;
directionalLight.position.x = 5;
directionalLight.position.y = 10;
directionalLight.position.z = 7.5;
scene.add(directionalLight);

const ambientLight = new AmbientLight(0xffffff, 0.75);
scene.add(ambientLight);

/* ------------------ Run ------------------ */

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
};

animate();