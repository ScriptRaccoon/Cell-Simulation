import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { growUp } from "../features/growUp.js";
import { poisonCells } from "../features/poisonCells.js";
import { removeIfOutside } from "../features/removeIfOutside.js";

export class Poison extends Body {
    constructor(pos) {
        super(pos, {
            x: randInt(-100, 100),
            y: randInt(-100, 100),
        });
        this.color = "#FF0020";
        this.features = [
            growUp({
                duration: 0.3,
                size: 20,
            }),
            poisonCells,
            removeIfOutside,
        ];
    }
}
