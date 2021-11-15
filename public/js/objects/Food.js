import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export class Food extends Body {
    constructor(x, y) {
        super(x, y);
        this.color = "#FF8030";
        this.vel = {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        };
        this.reproductionDelay = 300;
        this.growDuration = 0.8;
        this.growSize = 15;
    }

    update(deltaTime) {
        this.time++;
        this.growUp(deltaTime);
        this.updatePos(deltaTime);
        this.getEaten();
    }

    getEaten() {
        if (this.isGrownUp) {
            const cell = Body.objectsOfType.Cell.find((cell) =>
                this.touches(cell)
            );
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
