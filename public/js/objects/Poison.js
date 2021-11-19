import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { Cell } from "./Cell.js";
import { growUp } from "../features/growUp.js";
import { poisonCells } from "../features/poisonCells.js";
import { removeIfOutside } from "../features/removeIfOutside.js";

export class Poison extends Body {
    static frequency = 2000;

    static get number() {
        return Body.objectsOfType.Poison.filter((p) => p.active)
            .length;
    }

    static writeNumber() {
        $("#poisonInfo").text(`${Poison.number} poisons`);
    }

    static get nextSize() {
        return Cell.number < 900 || Math.random() < 0.5
            ? 20 + Math.floor(Cell.number / 20)
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
    }
}
