import Storage from "./Storage";
import config from "../../config";
import {Raycaster, Vector2} from "three";
import camera from "../../3d/space/camera";

class Sculpture {

    constructor(space) {
        this.space = space;
        this.structure = new Storage(space);
    }

    startAddEditMode() {
        const lI = config.scene.matrix - 1;
        const bm = this.structure.boxMatrix;

        this.structure.activeBoxes.forEach((obj) => {
            const i = obj.custom.indexes;

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
        });

        const raycaster = new Raycaster();
        let moved;
        document.addEventListener('mousedown', () => {
            moved = false;
        })
        document.addEventListener('mousemove', () => {
            moved = true;
        })
        document.addEventListener('mouseup', (e) => {
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
                    }
                }
            }
        });
    }

    startRemoveEditMode() {
        //todo
    }

}

export default Sculpture;