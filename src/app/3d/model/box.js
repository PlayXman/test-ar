import {BoxGeometry} from "three";
import {defaultMat} from "./materials";
import BoxMesh from "./BoxMesh";

const geometry = new BoxGeometry(1, 1, 1);

/**
 * Creates new instance of box object
 * @returns {BoxMesh}
 */
export function createBox() {
    const mesh = new BoxMesh(geometry, defaultMat());
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    return mesh;
}