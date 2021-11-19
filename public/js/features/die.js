import { Cell } from "../objects/Cell.js";
import { Food } from "../objects/Food.js";

export const die = (color) => (cell, deltaTime) => {
    if (!cell.poisoned) return;
    if (!cell.dieTime) {
        cell.dieTime = cell.time;
        cell.color = color;
    }
    cell.alpha -= ((cell.time - cell.dieTime) * deltaTime) / 100;
    if (cell.alpha <= 0) {
        cell.remove();
        Cell.writeNumber();
        if (Math.random() < 0.1 && Food.number < Food.maximalNumber) {
            new Food();
        }
    }
};
