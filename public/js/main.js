import { clearCanvas } from "./canvas.js";
import { timer } from "./Timer.js";
import { cells } from "./objects/Cell.js";
import { food } from "./objects/Food.js";

timer.update = (deltaTime) => {
    clearCanvas();
    food.update(cells, deltaTime);
    for (const cell of cells) {
        cell.update(food, deltaTime);
    }
    for (const obj of [...cells, food]) {
        obj.draw();
    }
};

document.addEventListener("DOMContentLoaded", () => timer.start());
