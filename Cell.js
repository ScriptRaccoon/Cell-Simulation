import { difference, randInt } from "./utils.js";
import { Body } from "./Body.js";

export const cells = [];

export const cellLimit = 1000;

export class Cell extends Body {
    constructor(x, y) {
        super(x, y);
        cells.push(this);
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(300, 400);
        this.maxForce = randInt(5, 40);
    }

    update(food, deltaTime) {
        const force = difference(this.pos, food.pos);
        this.applyForce(force);
        this.updatePos(deltaTime);
    }
}
