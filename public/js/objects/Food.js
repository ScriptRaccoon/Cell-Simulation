import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { cells } from "./Cell.js";

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
        this.reproductionDelay = 300;
        this.growDuration = 0.8;
        this.growSize = 15;
    }

    remove() {
        foods = foods.filter((f) => f != this);
    }

    update(deltaTime) {
        this.time++;
        this.growUp(deltaTime);
        this.updatePos(deltaTime);
        this.getEaten();
    }

    getEaten() {
        if (this.isGrownUp) {
            const cell = cells.find((cell) => this.touches(cell));
            if (cell) {
                this.remove();
                cell.reproduce();
                setTimeout(() => {
                    new Food();
                }, this.reproductionDelay);
            }
        }
    }
}

new Food();
