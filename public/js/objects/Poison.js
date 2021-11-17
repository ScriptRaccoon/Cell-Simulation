import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export class Poison extends Body {
    static frequency = 2000;

    constructor(x, y) {
        super(x, y);
        this.color = "#FF0020";
        this.vel = {
            x: randInt(-100, 100),
            y: randInt(-100, 100),
        };
        this.growDuration = 0.3;
        this.growSize =
            20 + Math.floor(Body.objectsOfType.Cell.length / 50);
        this.neutralized = false;
    }

    applyFeatures(deltaTime) {
        this.growUp(deltaTime);
        this.poisonCells();
        if (this.isOutside) {
            this.remove();
        }
    }

    poisonCells() {
        if (this.isGrownUp && !this.neutralized) {
            const cell = Body.objectsOfType.Cell.find(
                (cell) => !cell.poisoned && this.touches(cell)
            );
            if (cell) {
                this.size += 1;
                cell.poisoned = true;
            }
        }
    }

    neutralize() {
        this.neutralized = true;
        // this.color = "#50FF50";
        this.alpha = 0.2;
    }
}
