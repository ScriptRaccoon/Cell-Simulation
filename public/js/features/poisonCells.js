import { Body } from "../objects/Body.js";

export const poisonCells = (poison) => {
    if (poison.isGrownUp && poison.active) {
        const cell = Body.objectsOfType.Cell.find(
            (cell) => !cell.poisoned && poison.touches(cell)
        );
        if (cell) {
            poison.size += 1;
            cell.poisoned = true;
        }
    }
};
