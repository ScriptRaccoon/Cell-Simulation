import { clearCanvas } from "./canvas.js";
import { timer } from "./Timer.js";
import { cells } from "./objects/Cell.js";
import { foods } from "./objects/Food.js";

timer.update = (deltaTime) => {
    clearCanvas();
    for (const food of foods) {
        food.update(cells, deltaTime);
    }
    for (const cell of cells) {
        cell.update(foods, deltaTime);
    }
    for (const obj of [...cells, ...foods]) {
        obj.draw();
    }
};

document.addEventListener("DOMContentLoaded", () => timer.start());
