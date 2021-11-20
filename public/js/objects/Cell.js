import { eatFood } from "../features/eatFood.js";
import { targetClosest } from "../features/targetClosest.js";
import { swim } from "../features/swim.js";
import { die } from "../features/die.js";
import { growUp } from "../features/growUp.js";
import { rand, randInt } from "../utils.js";

import { Body } from "./Body.js";
import { avoid } from "../features/avoid.js";
import { collapse } from "../features/collapse.js";

export class Cell extends Body {
    static maximalNumber = 1000;

    static get number() {
        return Body.objectsOfType.Cell.length;
    }

    static writeNumber() {
        $("#cellInfo").text(`${Cell.number} cells`);
    }

    static immortalChance = 0.002; // 0.005
    static helperChance = 0.1; // 0.1

    constructor(pos, vel) {
        super(pos, vel);
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        Cell.writeNumber();
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
            collapse,
        ];
    }
}
