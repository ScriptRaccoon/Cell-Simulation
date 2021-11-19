import { adjustCanvas, clearCanvas } from "./canvas.js";
import { timer } from "./Timer.js";
import { Cell } from "./objects/Cell.js";
import { enableControls } from "./controls.js";
import { Body } from "./objects/Body.js";
import { Food } from "./objects/Food.js";
import { Poison } from "./objects/Poison.js";

timer.update = (deltaTime) => {
    clearCanvas();
    Body.updateAll(deltaTime);
    Body.drawAll();
};

$(() => {
    adjustCanvas();
    enableControls();
    new Cell();
    new Food();
    Poison.writeNumber();
    timer.start();
});
