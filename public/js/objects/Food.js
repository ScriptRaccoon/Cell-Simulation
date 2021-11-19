import { Body } from "./Body.js";
import { randInt } from "../utils.js";
import { growUp } from "../features/growUp.js";

export class Food extends Body {
    static maximalNumber = 4;

    static get number() {
        return Body.objectsOfType.Food.length;
    }

    static writeNumber() {
        $("#foodInfo").text(`${Food.number} foods`);
    }

    constructor(pos) {
        super(pos, {
            x: randInt(-50, 50),
            y: randInt(-50, 50),
        });
        this.color = "#FFA030";
        Food.writeNumber();
        this.features = [growUp({ duration: 0.8, size: 15 })];
    }
}
