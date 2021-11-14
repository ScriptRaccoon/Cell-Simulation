import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export let foods = [];

class Food extends Body {
    constructor(x, y) {
        super(x, y);
        foods.push(this);
        this.color = "#FF8030";
        this.size = 15;
        this.vel = {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        };
        this.delay = 200;
    }

    update(cells, deltaTime) {
        this.updatePos(deltaTime);
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
