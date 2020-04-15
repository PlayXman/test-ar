import {Color, Scene, WebGLRenderer} from "three";
import config from "../../config";
import {Controls} from "./controls";
import plane from "./plane";
import {ambientLight, directionalLight} from "./lights";
import camera from "./camera";

class Space {

    constructor() {
        this.scene = this._createScene();
        this.renderer = this._createRenderer();
        this.controls = new Controls(this.renderer.domElement);
    }

    start() {
        window.addEventListener('resize', this._resizeHandler, false);
        this._render();
    }

    _createScene() {
        const scene = new Scene();
        scene.background = new Color(config.scene.background);

        scene.add(plane)
        scene.add(directionalLight);
        scene.add(ambientLight);

        return scene;
    }

    _createRenderer() {
        const renderer = new WebGLRenderer({
            antialias: false
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;

        return renderer;
    }

    _render = () => {
        requestAnimationFrame(this._render);

        this.renderer.render(this.scene, camera);
    }

    _resizeHandler = () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

export default Space;