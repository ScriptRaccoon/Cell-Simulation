import { difference, rotate, randInt } from "./utils.js";
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
        this.maxForce = randInt(20, 40);
        this.time = 0;
        this.swim = { length: 50, amplitude: Math.PI / 6 };
        const cellNumber = cells.length;
        document.getElementById("info").innerText =
            cellNumber == 1 ? `${cellNumber} Zelle` : `${cellNumber} Zellen`;
    }

    update(food, deltaTime) {
        this.time++;
        const force = difference(this.pos, food.pos);
        this.applyForce(force);
        const swimAngle =
            this.swim.amplitude * Math.cos((this.time / this.swim.length) * Math.PI);
        this.applyForce(rotate(this.vel, swimAngle));
        this.updatePos(deltaTime);
    }
}
