import { Cell } from "../objects/Cell.js";
import { population } from "../Population.js";

export const reproduceCell = (pos, vel) => {
    if (
        population.getNumber("Cell") < population.getMaximum("Cell")
    ) {
        new Cell(pos, vel);
    }
};
