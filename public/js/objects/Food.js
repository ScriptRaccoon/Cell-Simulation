import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export class Food extends Body {
    static maximalNumber = 3;

    static get number() {
        return Body.objectsOfType.Food.length;
    }

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
        this.eaten = false;
    }

    applyFeatures(deltaTime) {
        this.growUp(deltaTime);
        this.getEaten();
    }

    getEaten() {
        if (this.isGrownUp) {
            const cell = Body.objectsOfType.Cell.find((cell) =>
                this.touches(cell)
            );
            if (cell) {
                this.eaten = true;
                this.remove();
                cell.reproduce();
                setTimeout(() => {
                    if (Food.number < Food.maximalNumber) {
                        new Food();
                    }
                }, this.reproductionDelay);
            }
        }
    }
}
