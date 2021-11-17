import { randEl, difference, distance } from "../utils.js";
import { Body } from "./Body.js";

export class Helper extends Body {
    constructor(x, y) {
        super(x, y);
        this.color = "#50FF50";
        this.size = 5;
        this.targetedPoison = null;
        this.maxSpeed = 500;
        this.maxForce = 1000;
    }

    applyFeatures(deltaTime) {
        this.targetPoison();
        this.killPoison();
        if (this.isOutside) {
            this.remove();
        }
    }

    targetPoison() {
        if (!this.targetedPoison) {
            const targets = Body.objectsOfType.Poison.filter(
                (p) => !p.neutralized
            ).sort(
                (p, q) =>
                    distance(p.pos, this.pos) -
                    distance(q.pos, this.pos)
            );
            if (targets) this.targetedPoison = targets[0];
        }
        if (this.targetedPoison) {
            const poisonForce = difference(
                this.pos,
                this.targetedPoison.pos
            );
            this.applyForce(poisonForce);
        }
    }

    killPoison() {
        if (
            this.targetedPoison &&
            this.touches(this.targetedPoison)
        ) {
            this.targetedPoison.neutralize();
        }
    }
}
