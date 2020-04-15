import Space from "./3d/space/index";
import Sculpture from "./models/sculpture/Sculpture";

const space = new Space();
const sculpture = new Sculpture(space);

window.sculpture = sculpture; //todo

document.body.appendChild(space.renderer.domElement);

space.start();