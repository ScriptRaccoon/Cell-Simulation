import { Body } from "./Body.js";
import { randInt } from "../utils.js";

export class Food extends Body {
    static maximalNumber = 4;

    static get number() {
        return Body.objectsOfType.Food.length;
    }

    static writeNumber() {
        $("#foodInfo").text(`${Food.number} foods`);
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
