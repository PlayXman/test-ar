import {BoxGeometry, Mesh} from "three";
import {defaultMat} from "./materials";

const geometry = new BoxGeometry(1, 1, 1);

export function createBox() {
    const mesh = new Mesh(geometry, defaultMat());
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    return mesh.clone();
}