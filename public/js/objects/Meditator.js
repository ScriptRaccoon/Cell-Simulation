import { canvas } from "../canvas.js";
import { growUp } from "../features/growUp.js";
import { maxAge } from "../features/maxAge.js";
import { slowDown } from "../features/slowDown.js";
import { Body } from "./Body.js";

export class Meditator extends Body {
    constructor() {
        super();
        this.pos = { x: canvas.width / 2, y: canvas.height / 2 };
        this.color = "#80300e";
        this.alpha = 0.7;
        this.maxSpeed = 0;
        this.maxForce = 0;
        this.features = [
            growUp({ duration: 0.5, size: 50 }),
            slowDown("Immortal", 1.02),
            maxAge(60000),
        ];
    }
}
