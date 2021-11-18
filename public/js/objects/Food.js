import { Body } from "./Body.js";
import { randInt } from "../utils.js";

const foodInfo = document.getElementById("foodInfo");

export class Food extends Body {
    static maximalNumber = 3;

    static get number() {
        return Body.objectsOfType.Food.length;
    }

    static writeNumber() {
        foodInfo.innerText = Food.number + " foods";
    }

    constructor(x, y) {
        super(x, y);
        this.color = "#FFA030";
        this.vel = {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        };
        this.growDuration = 0.8;
        this.growSize = 15;
        this.eaten = false;
        Food.writeNumber();
    }

    applyFeatures(deltaTime) {
        this.growUp(deltaTime);
    }
}
