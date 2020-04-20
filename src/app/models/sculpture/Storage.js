import config from "../../config";
import {createBox} from "../../3d/model/box";
import {defaultMat, editMat} from "../../3d/model/materials";

class Storage {

    activeBoxes = new Set();

    constructor(space) {
        this._space = space;
        this._middleIndex = Math.ceil((config.scene.matrix - 1) / 2);
        this.boxMatrix = this._initBoxMatrix();
    }

    add(obj) {
        obj.material = defaultMat();
        obj.castShadow = true;
        obj.visible = true;
        obj.custom.active = true;
        obj.scale.set(1, 1, 1);
        this.activeBoxes.add(obj);
    }

    /**
     * @param {BoxMesh} obj
     */
    edit(obj) {
        obj.material = editMat();
        obj.castShadow = false;
        obj.visible = true;
        obj.scale.set(0.6, 0.6, 0.6);
    }

    remove(obj) {
        if (this.activeBoxes.size > 1) {
            obj.visible = false;
            obj.custom.active = false;
            this.activeBoxes.delete(obj);
        }
    }

    /**
     * @param {function(x:number, y:number, z:number, box:BoxMesh)} callback
     */
    iterateAllBoxes(callback) {
        const l = this.boxMatrix.length;

        for (let x = 0; x < l; x++) {
            for (let y = 0; y < l; y++) {
                for (let z = 0; z < l; z++) {
                    callback(x, y, z, this.boxMatrix[x][y][z]);
                }
            }
        }
    }

    _initBoxMatrix() {
        const matrixLength = config.scene.matrix;
        const mi = this._middleIndex;

        const xArr = new Array(matrixLength);
        for (let x = 0; x < xArr.length; x++) {
            const yArr = new Array(matrixLength);
            for (let y = 0; y < yArr.length; y++) {
                const zArr = new Array(matrixLength);
                for (let z = 0; z < zArr.length; z++) {
                    const instance = this._createBox((x - mi), (yArr.length - 1 - y), (z - mi));
                    instance.custom.indexes.x = x;
                    instance.custom.indexes.y = y;
                    instance.custom.indexes.z = z;

                    this._space.scene.add(instance);
                    zArr[z] = instance;
                }
                yArr[y] = zArr;
            }
            xArr[x] = yArr;
        }

        this.add(xArr[mi][matrixLength - 1][mi]);

        return xArr;
    }

    _createBox(x, y, z) {
        const box = createBox();
        box.visible = false;
        box.position.set(x, y, z);

        return box;
    }

}

export default Storage;