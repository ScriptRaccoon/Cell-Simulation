import { Body } from "./Body.js";
import { eatFood } from "../features/eatFood.js";
import { targetClosest } from "../features/targetClosest.js";
import { swim } from "../features/swim.js";
import { growUp } from "../features/growUp.js";
import { rand, randInt } from "../utils.js";

export class Immortal extends Body {
    static get number() {
        return Body.objectsOfType.Immortal.length;
    }

    static writeNumber() {
        $(".cell-icon.immortal").show();
        $("#immortalInfo")
            .show()
            .text(`${Immortal.number} immortables`);
    }
    constructor(pos, vel) {
        super(pos, { x: 10, y: 10 });
        this.color = "#FFFFFF";
        this.alpha = 0.5;
        Immortal.writeNumber();
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.features = [
            growUp({ duration: 1, size: 5 }),
            targetClosest("Food"),
            swim({
                length: randInt(40, 50),
                amplitude: rand(Math.PI / 10, Math.PI / 8),
            }),
            eatFood,
        ];
    }
}
