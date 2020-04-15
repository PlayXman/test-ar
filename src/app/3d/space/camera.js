import {PerspectiveCamera} from "three";

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;

export default camera;