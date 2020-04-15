import {MeshPhysicalMaterial} from "three";
import config from "../../config";

export function defaultMat() {
    return new MeshPhysicalMaterial({
        color: config.model.color
    });
}

export function editMat() {
    return new MeshPhysicalMaterial({
        color: config.model.color,
        transparent: true,
        opacity: 0.2
    });
}