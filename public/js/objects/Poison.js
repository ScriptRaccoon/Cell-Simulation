import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { Cell } from "./Cell.js";
import { growUp } from "../features/growUp.js";
import { poisonCells } from "../features/poisonCells.js";
import { removeIfOutside } from "../features/removeIfOutside.js";
import { BlackHole } from "./BlackHole.js";

export class Poison extends Body {
    static frequency = 2000;

    static get nextSize() {
        return population.getNumber("Cell") < 900 ||
            Math.random() < 0.5
            ? 20 + Math.floor(population.getNumber("Cell") / 20)
            : 200;
    }

    constructor(pos) {
        super(pos, {
            x: randInt(-100, 100),
            y: randInt(-100, 100),
        });
        this.color = "#FF0020";
        this.features = [
            growUp({
                duration: 0.3,
                size: Poison.nextSize,
            }),
            poisonCells,
            removeIfOutside,
        ];
        Poison.writeNumber();
        if (Math.random() < BlackHole.frequency) new BlackHole();
    }
}
