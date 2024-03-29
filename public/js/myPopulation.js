import { Cell } from "./objects/Cell.js";
import { Helper } from "./objects/Helper.js";
import { Food } from "./objects/Food.js";
import { Immortal } from "./objects/Immortal.js";
import { Poison } from "./objects/Poison.js";
import { BlackHole } from "./objects/BlackHole.js";
import { Population } from "./Population.js";
import { Jumper } from "./objects/Jumper.js";
import { Meditator } from "./objects/Meditator.js";

export const population = new Population({
    status: {
        blueAge: true,
        whiteAge: false,
    },
    types: [
        "BlackHole",
        "Body",
        "Poison",
        "Cell",
        "Food",
        "Helper",
        "Meditator",
        "Jumper",
        "Immortal",
    ],
    init: () => {
        new Food();
        new Cell();
    },
    phase: () => {
        const cellNumber = population.getNumber("Cell");
        const immortalNumber = population.getNumber("Immortal");
        if (immortalNumber >= 300) {
            return 9;
        }
        if (immortalNumber >= 200) {
            return 8;
        }
        if (immortalNumber >= 100 && cellNumber == 0) {
            return 7;
        } else if (immortalNumber >= 100) {
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
        "Takeover",
        "Jumpin' all over",
        "Keep calm",
    ],
    reproduce: (pos, vel) => {
        const phase = population.phase();
        if (phase >= 7) {
            new Jumper();
            new Immortal();
        }
        if (
            phase == 8 &&
            Math.random() < 0.1 &&
            population.getNumber("Jumper") < 10
        ) {
            new Jumper();
        }
        if (phase == 9 && population.getNumber("Meditator") == 0) {
            new Meditator();
        }
        if (phase <= 6 && population.getNumber("Food") < 4) {
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
        } else if (phase == 6 && Math.random() < 0.4) {
            new BlackHole();
        }
        // friends
        if (phase >= 4 && Math.random() < 0.1) {
            new Immortal(pos, vel);
        } else if (phase >= 3 && phase <= 4 && Math.random() < 0.1) {
            new Helper(pos, vel);
        } else if (
            phase <= 6 &&
            population.getNumber("Cell") < 1000
        ) {
            new Cell(pos, vel);
        }
    },
    onDie() {
        if (
            population.getNumber("Immortal") >= 100 &&
            population.getNumber("Cell") == 0 &&
            population.status.blueAge
        ) {
            console.log("switched to white age");
            population.status.blueAge = false;
            population.status.whiteAge = true;
            new Jumper();
        }
    },
});
