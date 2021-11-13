import { difference, rotate, rand, randInt } from "../utils.js";
import { Body } from "./Body.js";

const cellInfo = document.getElementById("cellInfo");

export const cells = [];
const maximalCellNumber = 1000;

export class Cell extends Body {
    constructor(x, y) {
        super(x, y);
        cells.push(this);
        this.alpha = 0.5;
        this.color = "#3080FF";
        this.maxSpeed = randInt(200, 350);
        this.maxForce = randInt(30, 60);
        this.time = 0;
        this.swimLength = randInt(40, 50);
        this.swimAmplitude = rand(Math.PI / 10, Math.PI / 8);
        writeCellNumber();
    }

    update(food, deltaTime) {
        this.time++;
        const foodForce = difference(this.pos, food.pos);
        this.applyForce(foodForce);
        const swimAngle =
            this.swimAmplitude *
            Math.cos((this.time / this.swimLength) * Math.PI);
        const swimForce = rotate(this.vel, swimAngle);
        this.applyForce(swimForce);
        this.updatePos(deltaTime);
    }

    reproduce() {
        this.size += 1;
        this.maxSpeed /= 1.2;
        if (cells.length < maximalCellNumber) {
            new Cell(this.pos.x, this.pos.y);
        }
    }
}

function writeCellNumber() {
    cellInfo.innerText =
        cells.length + (cells.length > 1 ? " cells" : " cell");
}

new Cell();
