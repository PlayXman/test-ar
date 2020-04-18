import Storage from "./Storage";
import config from "../../config";
import {Raycaster, Vector2} from "three";
import camera from "../../3d/space/camera";
import Listeners from "../listeners/Listeners";

class Sculpture {

    listeners = new Listeners();

    constructor(space) {
        this.space = space;
        this.structure = new Storage(space);
    }

    startAddEditMode() {
        this.structure.activeBoxes.forEach(this._setEditModeAroundBox);

        const raycaster = new Raycaster();
        let moved;
        this.listeners.add('document', 'mousedown', () => {
            moved = false;
        });
        this.listeners.add('document', 'mousemove', () => {
            moved = true;
        });
        this.listeners.add('document', 'mouseup', (e) => {
            e.preventDefault();

            if (!moved) {
                const mouse = new Vector2(
                    (e.clientX / window.innerWidth) * 2 - 1,
                    -(e.clientY / window.innerHeight) * 2 + 1
                )

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(this.space.scene.children);
                for (let i = 0; i < intersects.length; i++) {
                    const obj = intersects[i].object;
                    if (obj.visible && obj.custom && !obj.custom.active) {
                        this.structure.add(obj);
                        this._setEditModeAroundBox(obj);
                        break;
                    }
                }
            }
        });
    }

    stopAddEditMode() {
        this.structure.iterateAllBoxes((x, y, z, box) => {
            if (box.visible && !box.custom.active) {
                box.visible = false;
            }
        });
        this.listeners.removeAll('document');
    }

    startRemoveEditMode() {
        //todo
    }

    _setEditModeAroundBox = (activeBox) => {
        const lI = config.scene.matrix - 1;
        const bm = this.structure.boxMatrix;
        const i = activeBox.custom.indexes;

        if (i.x > 0 && !bm[i.x - 1][i.y][i.z].visible) {
            this.structure.edit(bm[i.x - 1][i.y][i.z]);
        }
        if (i.x < lI && !bm[i.x + 1][i.y][i.z].visible) {
            this.structure.edit(bm[i.x + 1][i.y][i.z]);
        }
        if (i.y > 0 && !bm[i.x][i.y - 1][i.z].visible) {
            this.structure.edit(bm[i.x][i.y - 1][i.z]);
        }
        if (i.y < lI && !bm[i.x][i.y + 1][i.z].visible) {
            this.structure.edit(bm[i.x][i.y + 1][i.z]);
        }
        if (i.z > 0 && !bm[i.x][i.y][i.z - 1].visible) {
            this.structure.edit(bm[i.x][i.y][i.z - 1]);
        }
        if (i.z < lI && !bm[i.x][i.y][i.z + 1].visible) {
            this.structure.edit(bm[i.x][i.y][i.z + 1]);
        }
    }

}

export default Sculpture;