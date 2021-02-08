import { clearCanvas } from "./canvas.js";
import { Timer } from "./Timer.js";
import { Cell, cells } from "./Cell.js";
import { Food, foods } from "./Food.js";

new Cell();
new Food();

const timer = new Timer(1 / 60);

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

timer.start();
