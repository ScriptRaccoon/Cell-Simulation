import { Body } from "./Body.js";
import { randInt } from "../utils.js";

const poisonInfo = document.getElementById("poisonInfo");

export class Poison extends Body {
    static frequency = 2000;

    static get number() {
        return Body.objectsOfType.Poison.filter((p) => !p.neutralized)
            .length;
    }

    static writeNumber() {
        poisonInfo.innerText = Poison.number + " poisons";
    }

    constructor(x, y) {
        super(x, y);
        this.color = "#FF0020";
        this.vel = {
            x: randInt(-100, 100),
            y: randInt(-100, 100),
        };
        this.growDuration = 0.3;
        this.growSize =
            20 + Math.floor(Body.objectsOfType.Cell.length / 20);
        this.neutralized = false;
        Poison.writeNumber();
    }

    applyFeatures(deltaTime) {
        this.growUp(deltaTime);
        this.poisonCells();
        if (this.isOutside) {
            this.remove();
            Poison.writeNumber();
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
        this.alpha = 0.15;
    }
}
