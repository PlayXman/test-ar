import {Mesh, PlaneGeometry, ShadowMaterial} from "three";

const material = new ShadowMaterial();
material.opacity = 0.2;

const geometry = new PlaneGeometry(100, 100, 1, 1);
const mesh = new Mesh(geometry, material);

mesh.receiveShadow = true;
mesh.position.y = -0.5;
mesh.rotation.x = -Math.PI/2;

export default mesh;