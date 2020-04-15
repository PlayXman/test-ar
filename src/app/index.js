import Space from "./3d/space/index";
import Sculpture from "./models/Sculpture";

const space = new Space();
const sculpture = new Sculpture(space);

document.body.appendChild(space.renderer.domElement);

space.start();