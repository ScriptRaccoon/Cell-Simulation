import { growUp } from "../features/growUp.js";
import { jump } from "../features/jump.js";
import { randInt } from "../utils.js";
import { Body } from "./Body.js";

export class Jumper extends Body {
    constructor(pos, vel) {
        super(pos, vel);
        this.color = "#BB00FF";
        this.maxSpeed = randInt(500, 1000);
        this.maxForce = 1000;
        this.size = 10;
        this.features = [
            growUp({ duration: 0.5, size: 10 }),
            jump({ range: 100, wait: randInt(10, 20) }),
        ];
    }
}
