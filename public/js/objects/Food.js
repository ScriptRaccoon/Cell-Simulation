import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export let food;

class Food extends Body {
    constructor(x, y) {
        super(x, y);
        this.color = "#FF8030";
        this.size = 15;
        this.vel = {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        };
        food = this;
    }

    update(cells, deltaTime) {
        this.updatePos(deltaTime);
        const cell = cells.find((cell) => this.touches(cell));
        if (cell) {
            food = new Food();
            cell.reproduce();
        }
    }
}

food = new Food();
