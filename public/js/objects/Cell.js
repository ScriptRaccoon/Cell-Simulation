import {
    difference,
    rotate,
    rand,
    scale,
    randInt,
    distance,
} from "../utils.js";
import { Body } from "./Body.js";

const cellInfo = document.getElementById("cellInfo");

export class Cell extends Body {
    static maximalNumber = 1000;

    static get number() {
        return Body.objectsOfType.Cell.length;
    }

    static writeNumber() {
        cellInfo.innerText =
            Cell.number + (Cell.number > 1 ? " cells" : " cell");
    }

    constructor(x, y) {
        super(x, y);
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.swimLength = randInt(40, 50);
        this.swimAmplitude = rand(Math.PI / 10, Math.PI / 8);
        this.growDuration = 0.3;
        this.growSize = 10;
        this.poisonAvoidance = 100;
        Cell.writeNumber();
    }

    applyFeatures(deltaTime) {
        this.growUp(deltaTime);
        let avoiding = this.avoidPoison();
        if (!avoiding) this.targetFood();
        this.swim();
    }

    avoidPoison() {
        let avoiding = false;
        for (const poison of Body.objectsOfType.Poison) {
            if (
                distance(this.pos, poison.pos) <=
                2 * (this.size + poison.size)
            ) {
                avoiding = true;
                const poisonForce = difference(this.pos, poison.pos);
                const antiForce = scale(
                    poisonForce,
                    -this.poisonAvoidance
                );
                this.applyForce(antiForce);
            }
        }
        return avoiding;
    }

    targetFood() {
        const food = Body.objectsOfType.Food[0];
        if (food) {
            const foodForce = difference(this.pos, food.pos);
            this.applyForce(foodForce);
        }
    }

    swim() {
        const swimAngle =
            this.swimAmplitude *
            Math.cos((this.time / this.swimLength) * Math.PI);
        const swimForce = rotate(this.vel, swimAngle);
        this.applyForce(swimForce);
    }

    reproduce() {
        this.size += 1;
        this.maxSpeed /= 1.1;
        if (Cell.number < Cell.maximalNumber) {
            new Cell(this.pos.x, this.pos.y).vel = this.vel;
        }
    }
}
