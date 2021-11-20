import { Cell } from "./objects/Cell.js";
import { Helper } from "./objects/Helper.js";
import { Food } from "./objects/Food.js";
import { Immortal } from "./objects/Immortal.js";
import { Poison } from "./objects/Poison.js";
import { BlackHole } from "./objects/BlackHole.js";
import { Population } from "./Population.js";

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
    init: () => {
        new Food();
        new Cell();
    },
    phase: () => {
        const cellNumber = population.getNumber("Cell");
        const immortalNumber = population.getNumber("Immortal");
        if (immortalNumber >= 100) {
            return 6;
        } else {
            return Math.min(5, Math.floor(cellNumber / 100));
        }
    },
    phaseTitles: [
        "Looking for food",
        "Group dynamics",
        "Poison alert",
        "Helpers arrive",
        "I will survive",
        "Don't get trapped!",
        "Extinction",
    ],
    reproduce: (pos, vel) => {
        const phase = population.phase();

        // food
        if (phase <= 5 && population.getNumber("Food") < 4) {
            new Food();
        }
        if (
            phase >= 1 &&
            phase <= 5 &&
            Math.random() < 0.1 &&
            population.getNumber("Food") < 4
        ) {
            new Food();
        }
        // opponents
        if (phase >= 2 && phase <= 4 && Math.random() < 0.2) {
            new Poison();
        } else if (phase == 5 && Math.random() < 0.02) {
            new BlackHole();
        } else if (phase == 6 && Math.random() < 0.1) {
            new BlackHole();
        }
        // friends
        if (phase >= 4 && Math.random() < 0.1) {
            new Immortal(pos, vel);
        } else if (phase >= 3 && phase <= 4 && Math.random() < 0.1) {
            new Helper(pos, vel);
        } else if (population.getNumber("Cell") < 1000) {
            new Cell(pos, vel);
        }
    },
});
