import { population } from "../Population.js";

export const poisonCells = (poison) => {
    if (poison.isGrownUp && poison.active) {
        const cell = population
            .get("Cell")
            .find((cell) => !cell.poisoned && poison.touches(cell));
        if (cell) {
            poison.size += 1;
            cell.poisoned = true;
        }
    }
};
