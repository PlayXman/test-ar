import {Mesh} from "three";

class BoxMesh extends Mesh {

    custom = {
        indexes: {
            x: -1,
            y: -1,
            z: -1
        },
        active: false
    }

}

export default BoxMesh;