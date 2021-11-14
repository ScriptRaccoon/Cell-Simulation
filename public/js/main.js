import { clearCanvas } from "./canvas.js";
import { timer } from "./Timer.js";
import { cells } from "./objects/Cell.js";
import { foods } from "./objects/Food.js";
import { poisons } from "./objects/Poison.js";

timer.update = (deltaTime) => {
    clearCanvas();
    for (const obj of [...cells, ...foods, ...poisons]) {
        obj.update(deltaTime);
    }
    for (const obj of [...cells, ...foods, ...poisons]) {
        obj.draw();
    }
};

document.addEventListener("DOMContentLoaded", () => timer.start());
