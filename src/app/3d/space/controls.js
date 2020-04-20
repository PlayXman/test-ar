import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import camera from "./camera";
import {MOUSE, TOUCH, Vector3} from "three";

const STEP = 0.5;
const MIN_DISTANCE = 1.5; //so you can't go inside model (needs a test)
const MAX_DISTANCE = 10; //so you can't unzoom to infinity (maybe not needed, just looks good)
const BOUNDING_DEFAULT = 10000000;

export class Controls {

    /** @type {OrbitControls} */
    controls = null;
    /**
     * @type {{x: {min: number, max: number}, y: {min: number, max: number}, z: {min: number, max: number}}}
     */
    boundingBox = {
        x: {min: 0, max: 0},
        y: {min: 0, max: 0},
        z: {min: 0, max: 0},
    }

    /**
     * @param {HTMLCanvasElement} domElement Renderer dom element
     */
    constructor(domElement) {
        this.controls = new OrbitControls(camera, domElement);

        this.controls.enableKeys = false;
        this.controls.enablePan = false;

        this.controls.maxPolarAngle = (Math.PI / 180) * 120;

        this.controls.minDistance = MIN_DISTANCE;
        this.controls.maxDistance = MAX_DISTANCE;

        this.controls.target.set(0, 0, 0);

        this.controls.mouseButtons.LEFT = -1;
        this.controls.mouseButtons.RIGHT = MOUSE.ROTATE;
        this.controls.touches.ONE = -1;
        this.controls.touches.TWO = TOUCH.DOLLY_ROTATE;
    }

    sizeUp(newObjX, newObjY, newObjZ) {
        const bb = this.boundingBox;

        if (newObjX < bb.x.min) {
            bb.x.min = newObjX;
        } else if (newObjX > bb.x.max) {
            bb.x.max = newObjX;
        }

        if (newObjY < bb.y.min) {
            bb.y.min = newObjY;
        } else if (newObjY > bb.y.max) {
            bb.y.max = newObjY;
        }

        if (newObjZ < bb.z.min) {
            bb.z.min = newObjZ;
        } else if (newObjZ > bb.z.max) {
            bb.z.max = newObjZ;
        }

        this._updateTarget();
        this._updateDistance();

        this.controls.update();
    }

    sizeDown(restObjs) {
        const bb = this.boundingBox;
        const axes = ['x', 'y', 'z'];

        axes.forEach((pos) => {
            bb[pos].min = BOUNDING_DEFAULT;
            bb[pos].max = -BOUNDING_DEFAULT;
        });

        restObjs.forEach((obj) => {
            const o = obj.position;

            axes.forEach((pos) => {
                if (o[pos] < bb[pos].min) bb[pos].min = o[pos];
                if (o[pos] > bb[pos].max) bb[pos].max = o[pos];
            });
        });

        this._updateTarget();
        this._updateDistance();

        this.controls.update();
    }

    _updateDistance() {
        const bb = this.boundingBox;
        let maxPos = 0;

        Object.keys(bb).forEach((pos) => {
            const min = Math.abs(bb[pos].min);
            if (maxPos < min) maxPos = min;
            else if (maxPos < bb[pos].max) maxPos = bb[pos].max;
        });

        this.controls.minDistance = MIN_DISTANCE + STEP * maxPos;
        this.controls.maxDistance = MAX_DISTANCE + STEP * maxPos;
    }

    _updateTarget() {
        const bb = this.boundingBox;
        const v = new Vector3(0, 0, 0);

        Object.keys(bb).forEach((pos) => {
            v[pos] = (bb[pos].max + bb[pos].min) / 2
        })

        this.controls.target = v;
    }

}
