import { eatFood } from "../features/eatFood.js";
import { targetClosest } from "../features/targetClosest.js";
import { swim } from "../features/swim.js";
import { die } from "../features/die.js";
import { growUp } from "../features/growUp.js";
import { rand, randInt } from "../utils.js";

import { Body } from "./Body.js";
import { avoid } from "../features/avoid.js";
import { collapse } from "../features/collapse.js";
import { removeIfFarOutside } from "../features/removeIfOutside.js";

export class Cell extends Body {
    constructor(pos, vel) {
        super(pos, vel);
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.features = [
            growUp({ duration: 1, size: 10 }),
            targetClosest("Food"),
            swim({
                length: randInt(40, 50),
                amplitude: rand(Math.PI / 10, Math.PI / 8),
            }),
            avoid({ factor: randInt(2, 8), type: "Poison" }),
            eatFood,
            die("#FF80FF"),
            collapse({ maxAge: null }),
            removeIfFarOutside,
        ];
    }
}
