import { Cell } from "../objects/Cell.js";
import { Poison } from "../objects/Poison.js";
import { population } from "../Population.js";

export const reproduceCell = (pos, vel) => {
    if (
        population.getNumber("Cell") < population.getMaximum("Cell")
    ) {
        new Cell(pos, vel);
    }
    if (population.phase >= 2 && Math.random() < 0.2) {
        new Poison();
    }
};
