import { Body } from "./Body.js";
import { targetClosest } from "../features/targetClosest.js";
import { swim } from "../features/swim.js";
import { growUp } from "../features/growUp.js";
import { rand, randInt } from "../utils.js";
import { slowDown } from "../features/slowDown.js";
import { eatJumper } from "../features/eatJumper.js";

export class Immortal extends Body {
    constructor(pos, vel) {
        super(pos, vel);
        this.color = "#FFFFFF";
        this.alpha = 0.7;
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.features = [
            growUp({ duration: 1, size: 5 }),
            targetClosest("Food"),
            targetClosest("Jumper"),
            slowDown("Jumper"),
            eatJumper,
            swim({
                length: randInt(40, 50),
                amplitude: rand(Math.PI / 10, Math.PI / 8),
            }),
        ];
    }
}
