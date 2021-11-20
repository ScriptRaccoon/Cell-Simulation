import { Food } from "../objects/Food.js";
import { population } from "../Population.js";

export const die = (color) => (cell, deltaTime) => {
    if (!cell.poisoned) return;
    if (!cell.dieTime) {
        cell.dieTime = cell.time;
        cell.color = color;
    }
    cell.alpha -= ((cell.time - cell.dieTime) * deltaTime) / 100;
    if (cell.alpha <= 0) {
        population.remove(cell);

        if (
            Math.random() < 0.1 &&
            population.getNumber("Food") <
                population.getMaximum("Food")
        ) {
            new Food();
        }
    }
};
