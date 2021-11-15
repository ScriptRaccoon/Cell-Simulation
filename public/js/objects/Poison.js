import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { Cell } from "./Cell.js";

export class Poison extends Body {
    static get List() {
        return Body.List.filter(
            (p) => p.constructor.name == "Poison"
        );
    }

    static frequency = 5000;

    constructor(x, y) {
        super(x, y);
        this.color = "#FF0020";
        this.vel = {
            x: randInt(-100, 100),
            y: randInt(-100, 100),
        };
        this.growDuration = 0.3;
        this.growSize = 20;
    }

    static removeAll() {
        for (const p of Poison.List) {
            p.remove();
        }
    }

    update(deltaTime) {
        this.time++;
        this.growUp(deltaTime);
        this.eatCells();
        this.updatePos(deltaTime);
        if (this.isOutside) {
            this.remove();
        }
    }

    eatCells() {
        if (this.isGrownUp) {
            const cell = Cell.List.find((cell) => this.touches(cell));
            if (cell) {
                this.size += 1;
                cell.remove();
                Cell.number--;
                Cell.writeNumber();
            }
        }
    }
}
