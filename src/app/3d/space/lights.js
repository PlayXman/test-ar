import {AmbientLight, DirectionalLight} from "three";

export const directionalLight = new DirectionalLight(0xffffff, 0.25);
directionalLight.castShadow = true;
directionalLight.position.x = 5;
directionalLight.position.y = 10;
directionalLight.position.z = 7.5;

export const ambientLight = new AmbientLight(0xffffff, 0.75);
