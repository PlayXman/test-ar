import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import camera from "./camera";

export class Controls {

    /**
     * @param {HTMLCanvasElement} domElement Renderer dom element
     */
    constructor(domElement) {
        this.controls = new OrbitControls(camera, domElement);
        this.controls.enableKeys = false;
        this.controls.enablePan = false;
        this.controls.maxPolarAngle = Math.PI/2;
        this.controls.minDistance = 1.5; //so you can't go inside model (needs a test)
        this.controls.maxDistance = 10; //so you can't unzoom to infinity (maybe not needed, just looks good)
    }

    sizeUp() {
        //todo
    }

    sizeDown() {
        //todo
    }

}
