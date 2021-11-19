import { targetClosest } from "../features/targetClosest.js";
import { deactivateTarget } from "../features/deactivateTarget.js";
import { removeIfOutside } from "../features/removeIfOutside.js";
import { swim } from "../features/swim.js";

import { Body } from "./Body.js";

export class Helper extends Body {
    constructor(pos, vel) {
        super(pos, vel);
        this.color = "#50FF50";
        this.size = 5;
        this.maxSpeed = 400;
        this.maxForce = 1000;
        this.features = [
            targetClosest("Poison"),
            swim({
                length: 30,
                amplitude: Math.PI / 15,
            }),
            deactivateTarget,
            removeIfOutside,
        ];
    }
}
