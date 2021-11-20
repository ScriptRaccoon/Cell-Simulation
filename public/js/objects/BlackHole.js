import { collapse } from "../features/collapse.js";
import { growUp } from "../features/growUp.js";
import { removeIfOutside } from "../features/removeIfOutside.js";
import { suckIn } from "../features/suckIn.js";
import { randInt } from "../utils.js";
import { Body } from "./Body.js";

export class BlackHole extends Body {
    static frequency = 0.03;

    constructor(pos) {
        super(pos, { x: randInt(-9, 9), y: randInt(-9, 9) });
        this.color = "#000000";
        this.features = [
            growUp({ duration: 1, size: randInt(10, 20) }),
            suckIn({
                range: randInt(50, 100),
                maxSize: randInt(200, 300),
                type: "Cell",
            }),
            collapse,
            removeIfOutside,
        ];
    }
}
