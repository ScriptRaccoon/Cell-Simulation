import { population } from "../myPopulation.js";

export const die = (color) => (cell, deltaTime) => {
    if (!cell.poisoned) return;
    if (!cell.dieTime) {
        cell.dieTime = cell.time;
        cell.color = color;
    }
    cell.alpha -= ((cell.time - cell.dieTime) * deltaTime) / 100;
    if (cell.alpha <= 0) {
        population.remove(cell);
        population.onDie();
    }
};
