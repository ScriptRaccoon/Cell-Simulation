import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { growUp } from "../features/growUp.js";
import { removeIfFarOutside } from "../features/removeIfOutside.js";

export class Food extends Body {
    constructor(pos) {
        super(pos, {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        });
        this.color = "#FFA030";
        this.features = [
            growUp({ duration: 0.8, size: 15 }),
            removeIfFarOutside,
        ];
    }
}
