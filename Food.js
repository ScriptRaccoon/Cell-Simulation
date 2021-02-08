import { Body } from "./Body.js";
import { Cell, cellLimit } from "./Cell.js";
import { removeEl, randInt } from "./utils.js";

export const foods = [];

const variation = 50;

export class Food extends Body {
    constructor(x, y) {
        super(x, y);
        foods.push(this);
        this.color = "#FF8030";
        this.size = 15;
        this.vel = {
            x: randInt(-variation, variation),
            y: randInt(-variation, variation),
        };
    }

    update(cells, deltaTime) {
        this.updatePos(deltaTime);
        if (cells.some((cell) => this.touches(cell))) {
            removeEl(this, foods);
            if (cells.length <= cellLimit) {
                new Cell(this.pos.x, this.pos.y);
                new Food();
            }
        }
    }
}
