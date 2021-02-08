import { difference, scale, rotate, limit, randInt } from "./utils.js";
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
        this.maxForce = randInt(15, 40);
        this.time = 0;
        this.waveCounter = 50;
        this.maxWave = 170;
        const cellNumber = cells.length;
        document.getElementById("info").innerText =
            cellNumber == 1 ? `${cellNumber} Zelle` : `${cellNumber} Zellen`;
    }

    update(food, deltaTime) {
        this.time++;
        if (this.time % this.waveCounter === 0) {
            if (this.time % (2 * this.waveCounter) === 0) {
                this.applyForce(rotate(this.vel, -Math.PI / 2), this.maxWave);
            } else {
                this.applyForce(rotate(this.vel, Math.PI / 2), this.maxWave);
            }
        }
        const force = difference(this.pos, food.pos);
        this.applyForce(force);
        this.updatePos(deltaTime);
    }
}
