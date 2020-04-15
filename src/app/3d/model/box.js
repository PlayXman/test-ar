import {BoxGeometry} from "three";
import {defaultMat} from "./materials";
import BoxMesh from "./BoxMesh";

const geometry = new BoxGeometry(1, 1, 1);

export function createBox() {
    const mesh = new BoxMesh(geometry, defaultMat());
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    return mesh;
}