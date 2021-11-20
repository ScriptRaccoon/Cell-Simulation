import { adjustCanvas, clearCanvas } from "./canvas.js";
import { timer } from "./Timer.js";
import { enableControls } from "./controls.js";
import { history } from "./History.js";
import { population } from "./Population.js";

timer.update = (deltaTime) => {
    clearCanvas();
    population.update(deltaTime);
    population.draw();
};

$(() => {
    adjustCanvas();
    enableControls();
    population.start();
    history.start();
    timer.start();
});
