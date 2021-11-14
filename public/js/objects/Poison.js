import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { cells } from "./Cell.js";

export let poisons = [];

class Poison extends Body {
    constructor(x, y) {
        super(x, y);
        poisons.push(this);
        this.color = "#FF0020";
        this.vel = {
            x: randInt(-100, 100),
            y: randInt(-100, 100),
        };
        this.growDuration = 0.3;
        this.growSize = 20;
    }

    update(deltaTime) {
        this.time++;
        this.growUp(deltaTime);
        this.eatCells();
        this.updatePos(deltaTime);
    }

    eatCells() {
        if (this.isGrownUp) {
            const cell = cells.find((cell) => this.touches(cell));
            if (cell) {
                this.size += 1;
                cell.remove();
            }
        }
    }
}

setInterval(() => new Poison(), 5000);