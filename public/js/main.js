import { adjustCanvas, clearCanvas } from "./canvas.js";
import { timer } from "./Timer.js";
import { Cell } from "./objects/Cell.js";
import { enableControls } from "./controls.js";
import { Body } from "./objects/Body.js";
import { Food } from "./objects/Food.js";

timer.update = (deltaTime) => {
    clearCanvas();
    Body.updateAll(deltaTime);
    Body.drawAll();
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    adjustCanvas();
    enableControls();
    new Cell();
    new Food();
    timer.start();
}
