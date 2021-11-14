import {
    difference,
    rotate,
    rand,
    scale,
    randInt,
    distance,
} from "../utils.js";
import { Body } from "./Body.js";
import { foods } from "./Food.js";
import { poisons } from "./Poison.js";

const cellInfo = document.getElementById("cellInfo");

export let cells = [];
const maximalCellNumber = 1000;

export class Cell extends Body {
    constructor(x, y) {
        super(x, y);
        cells.push(this);
        writeCellNumber();
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.swimLength = randInt(40, 50);
        this.swimAmplitude = rand(Math.PI / 10, Math.PI / 8);
        this.growDuration = 0.3;
        this.growSize = 10;
        this.poisonAvoidance = 100;
        this.priority = null;
    }

    remove() {
        cells = cells.filter((c) => c != this);
        writeCellNumber();
    }

    update(deltaTime) {
        this.priority = null;
        this.time++;
        this.growUp(deltaTime);
        this.avoidPoison();
        this.targetFood();
        this.swim();
        this.updatePos(deltaTime);
    }

    targetFood() {
        if (foods[0] && !this.priority) {
            const foodForce = difference(this.pos, foods[0].pos);
            this.applyForce(foodForce);
        }
    }

    avoidPoison() {
        for (const poison of poisons) {
            if (
                distance(this.pos, poison.pos) <=
                2 * (this.size + poison.size)
            ) {
                this.priority = "poison";
                const poisonForce = difference(this.pos, poison.pos);
                const antiForce = scale(
                    poisonForce,
                    -this.poisonAvoidance
                );
                this.applyForce(antiForce);
            }
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
        if (cells.length < maximalCellNumber) {
            const newCell = new Cell(this.pos.x, this.pos.y);
            newCell.vel = this.vel;
        }
    }
}

function writeCellNumber() {
    cellInfo.innerText =
        cells.length + (cells.length > 1 ? " cells" : " cell");
}

new Cell();
