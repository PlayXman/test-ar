import {BoxGeometry, Mesh} from "three";
import material from "./material";

const box = new BoxGeometry(1, 1, 1);
export default new Mesh( box, material );