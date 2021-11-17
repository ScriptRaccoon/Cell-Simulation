import {
    difference,
    rotate,
    rand,
    scale,
    randInt,
    distance,
    randEl,
} from "../utils.js";
import { Body } from "./Body.js";
import { Food } from "./Food.js";
import { Helper } from "./Helper.js";

const cellInfo = document.getElementById("cellInfo");

export class Cell extends Body {
    static maximalNumber = 1000;

    static get number() {
        return Body.objectsOfType.Cell.length;
    }

    static writeNumber() {
        cellInfo.innerText =
            Cell.number + (Cell.number == 1 ? " cell" : " cells");
    }

    constructor(x, y) {
        super(x, y);
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.swimLength = randInt(40, 50);
        this.swimAmplitude = rand(Math.PI / 10, Math.PI / 8);
        this.growDuration = 1;
        this.growSize = 10;
        this.prudence = randInt(2, 8);
        this.dieTime = null;
        this.poisoned = false;
        this.targetedFood = null;
        Cell.writeNumber();
    }

    applyFeatures(deltaTime) {
        this.growUp(deltaTime);
        let avoiding = this.avoidPoison();
        if (!avoiding) this.targetFood();
        this.swim();
        if (this.poisoned) this.die(deltaTime);
    }

    avoidPoison() {
        let avoiding = false;
        for (const poison of Body.objectsOfType.Poison) {
            if (
                !poison.neutralized &&
                distance(this.pos, poison.pos) <=
                    this.prudence * (this.size + poison.size)
            ) {
                avoiding = true;
                const poisonForce = difference(this.pos, poison.pos);
                const antiForce = scale(poisonForce, -1);
                this.applyForce(antiForce);
            }
        }
        return avoiding;
    }

    targetFood() {
        if (!this.targetedFood || this.targetedFood.eaten) {
            this.targetedFood = randEl(Body.objectsOfType.Food);
        }
        if (this.targetedFood) {
            const foodForce = difference(
                this.pos,
                this.targetedFood.pos
            );
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
            if (Math.random() < 0.1 && poisonToggler.checked) {
                new Helper(this.pos.x, this.pos.y).vel = this.vel;
            } else {
                new Cell(this.pos.x, this.pos.y).vel = this.vel;
            }
        }
    }

    die(deltaTime) {
        if (!this.dieTime) {
            this.dieTime = this.time;
            this.color = "#FF80FF";
        }
        this.alpha -= ((this.time - this.dieTime) * deltaTime) / 100;
        if (this.alpha <= 0) {
            this.remove();
            Cell.writeNumber();
            if (
                Math.random() < 0.1 &&
                Food.number < Food.maximalNumber
            ) {
                new Food();
            }
        }
    }
}
