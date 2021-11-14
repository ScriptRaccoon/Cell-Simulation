import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export let foods = [];

class Food extends Body {
    constructor(x, y) {
        super(x, y);
        foods.push(this);
        this.color = "#FF8030";
        this.vel = {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        };
        this.delay = 300;
        this.time = 0;
        this.growDuration = 0.5;
        this.growSize = 15;
    }

    update(cells, deltaTime) {
        this.time++;
        this.grow(deltaTime);
        this.updatePos(deltaTime);
        if (this.size < this.growSize) return;
        const cell = cells.find((cell) => this.touches(cell));
        if (cell) {
            foods = foods.filter((f) => f != this);
            setTimeout(() => {
                new Food();
            }, this.delay);
            cell.reproduce();
        }
    }
}

new Food();
