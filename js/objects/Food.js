import { Body } from "./Body.js";
import { Cell, cellLimit } from "./Cell.js";
import { randInt } from "../utils.js";

export let food = null;

const variation = 50;

export class Food extends Body {
    constructor(x, y) {
        super(x, y);
        food = this;
        this.color = "#FF8030";
        this.size = 15;
        this.vel = {
            x: randInt(-variation, variation),
            y: randInt(-variation, variation),
        };
    }

    update(cells, deltaTime) {
        this.updatePos(deltaTime);
        const cell = cells.find((cell) => this.touches(cell));
        if (cell) {
            cell.size += 1;
            new Food();
            if (cells.length <= cellLimit) {
                new Cell(this.pos.x, this.pos.y);
            }
        }
    }
}
