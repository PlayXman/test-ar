import Space from "./3d/space/index";
import Sculpture from "./models/sculpture/Sculpture";
import Layout from "./layout";

const space = new Space();
const sculpture = new Sculpture(space);

const layout = new Layout();
layout.createAddButton(() => {
    sculpture.startAddEditMode();
}, () => {
    sculpture.stopAddEditMode();
});

document.body.appendChild(space.renderer.domElement);
document.body.appendChild(layout.render());

space.start();