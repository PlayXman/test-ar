import Storage from "./Storage";
import config from "../../config";
import {Raycaster, Vector2} from "three";
import camera from "../../3d/space/camera";
import Listeners from "../listeners/Listeners";

class Sculpture {

    /** @type {Listeners} */
    listeners = new Listeners();
    /** @type {Space} */
    space = null;
    /** @type {Storage} */
    structure = null;
    /** @type {HTMLCanvasElement} */
    canvasElement = null;

    constructor(space) {
        this.space = space;
        this.canvasElement = this.space.renderer.domElement;
        this.structure = new Storage(space);
    }

    startAddEditMode() {
        this.structure.activeBoxes.forEach(this._setEditModeAroundBox);

        const raycaster = new Raycaster();

        const handleClick = (e) => {
            e.preventDefault();

            if (e.which === 1 || e.changedTouches.length) {
                const pointerPos = {
                    x: e.clientX !== undefined ? e.clientX : e.changedTouches[0].clientX,
                    y: e.clientY !== undefined ? e.clientY : e.changedTouches[0].clientY
                };
                const pointer = new Vector2(
                    (pointerPos.x / window.innerWidth) * 2 - 1,
                    -(pointerPos.y / window.innerHeight) * 2 + 1
                );

                raycaster.setFromCamera(pointer, camera);
                const intersects = raycaster.intersectObjects(this.space.scene.children);
                for (let i = 0; i < intersects.length; i++) {
                    const obj = intersects[i].object;
                    if (obj.visible && obj.custom && !obj.custom.active) {
                        this.structure.add(obj);
                        this.space.controls.sizeUp(obj.position.x, obj.position.y, obj.position.z);
                        this._setEditModeAroundBox(obj);
                        break;
                    }
                }
            }
        };

        this.listeners.add(this.canvasElement, 'mouseup', handleClick);
        this.listeners.add(this.canvasElement, 'touchend', handleClick);
    }

    stopAddEditMode() {
        this.structure.iterateAllBoxes((x, y, z, box) => {
            if (box.visible && !box.custom.active) {
                box.visible = false;
            }
        });
        this.listeners.removeAll(this.canvasElement);
    }

    startRemoveEditMode() {
        const raycaster = new Raycaster();

        const handleClick = (e) => {
            e.preventDefault();

            if (e.which === 1 || e.changedTouches.length) {
                const pointerPos = {
                    x: e.clientX !== undefined ? e.clientX : e.changedTouches[0].clientX,
                    y: e.clientY !== undefined ? e.clientY : e.changedTouches[0].clientY
                };
                const pointer = new Vector2(
                    (pointerPos.x / window.innerWidth) * 2 - 1,
                    -(pointerPos.y / window.innerHeight) * 2 + 1
                );

                raycaster.setFromCamera(pointer, camera);
                const intersects = raycaster.intersectObjects(this.space.scene.children);
                for (let i = 0; i < intersects.length; i++) {
                    const obj = intersects[i].object;
                    if (obj.visible && obj.custom && obj.custom.active) {
                        this.structure.remove(obj);
                        this.space.controls.sizeDown(this.structure.activeBoxes);
                        break;
                    }
                }
            }
        };

        this.listeners.add(this.canvasElement, 'mouseup', handleClick);
        this.listeners.add(this.canvasElement, 'touchend', handleClick);
    }

    stopRemoveEditMode() {
        this.listeners.removeAll(this.canvasElement);
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