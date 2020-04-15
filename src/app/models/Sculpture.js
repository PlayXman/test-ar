import config from "../config";
import {createBox} from "../3d/model/box";

class Sculpture {

    constructor(space) {
        this.space = space;
        this.middleIndex = Math.ceil((config.scene.matrix - 1) / 2);
        this.boxMatrix = this._initBoxMatrix();
    }

    _initBoxMatrix() {
        const matrixLength = config.scene.matrix;
        const mi = this.middleIndex;

        const xArr = new Array(matrixLength);
        for (let x = 0; x < xArr.length; x++) {
            const yArr = new Array(matrixLength);
            for (let y = 0; y < yArr.length; y++) {
                const zArr = new Array(matrixLength);
                for (let z = 0; z < zArr.length; z++) {
                    const instance = this._createBox((x - mi), (yArr.length - 1 - y), (z - mi));

                    this.space.scene.add(instance);
                    zArr[z] = instance;
                }
                yArr[y] = zArr;
            }
            xArr[x] = yArr;
        }

        xArr[mi][matrixLength - 1][mi].visible = true;

        return xArr;
    }

    _createBox(x, y, z) {
        const box = createBox();
        box.visible = false;
        box.position.x = x;
        box.position.y = y;
        box.position.z = z;

        return box;
    }

}

export default Sculpture;