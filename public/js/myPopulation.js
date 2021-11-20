import { Cell } from "./objects/Cell.js";
import { Helper } from "./objects/Helper.js";
import { Food } from "./objects/Food.js";
import { Immortal } from "./objects/Immortal.js";
import { Poison } from "./objects/Poison.js";
import { BlackHole } from "./objects/BlackHole.js";
import { Population } from "./Population.js";

const DEV = false;

export const population = new Population({
    types: [
        "BlackHole",
        "Body",
        "Poison",
        "Cell",
        "Food",
        "Helper",
        "Immortal",
    ],
    maximums: { Food: 4, Cell: 1000 },
    init: () => {
        new Food();
        new Cell();
    },
    phase: () => {
        const cellNumber = population.getNumber("Cell");
        return Math.min(5, Math.floor(cellNumber / (DEV ? 10 : 100)));
    },
    phaseTitles: [
        "Looking for food",
        "Group dynamics",
        "Poison alert",
        "Helpers arrive",
        "I will survive",
        "Don't get trapped!",
    ],
    reproduce: (pos, vel) => {
        const phase = population.phase();
        if (phase >= 2 && phase <= 4 && Math.random() < 0.2) {
            new Poison();
        }
        if (
            phase >= 1 &&
            Math.random() < 0.05 &&
            population.getNumber("Food") <
                population.getMaximum("Food")
        ) {
            new Food();
        }
        if (phase >= 5 && Math.random() < 0.02) {
            new BlackHole();
        } else if (phase >= 4 && Math.random() < 0.1) {
            new Immortal(pos, vel);
        } else if (
            population.phase >= 3 &&
            population.phase <= 4 &&
            Math.random() < 0.1
        ) {
            new Helper(pos, vel);
        } else if (
            population.getNumber("Cell") <
            population.getMaximum("Cell")
        ) {
            new Cell(pos, vel);
        }
    },
});
