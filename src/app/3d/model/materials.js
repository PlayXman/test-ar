import {MeshPhysicalMaterial} from "three";
import config from "../../config";

export function defaultMat() {
    return new MeshPhysicalMaterial({
        color: config.model.color
    });
}