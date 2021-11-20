import { canvas, ctx, threshold } from "../canvas.js";
import { randInt, distance, limit } from "../utils.js";
import { population } from "../myPopulation.js";

export class Body {
    constructor(pos, vel) {
        this.type = this.constructor.name;
        this.pos = pos || {
            x: randInt(threshold, canvas.width - threshold),
            y: randInt(threshold, canvas.height - threshold),
        };
        this.vel = vel || { x: 0, y: 0 };
        this.size = 0;
        this.alpha = 1;
        this.color = "#00FF00";
        this.maxForce = 0;
        this.maxSpeed = 0;
        this.time = 0;
        this.isGrownUp = false;
        this.active = true;
        this.features = [];
        population.add(this);
    }

    touches(body) {
        return distance(this.pos, body.pos) < this.size + body.size;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    updatePosition(deltaTime) {
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
    }

    update(deltaTime) {
        this.time++;
        for (const feature of this.features) {
            feature(this, deltaTime);
        }
        this.updatePosition(deltaTime);
    }

    applyForce(force) {
        const limitedForce = limit(force, this.maxForce);
        this.vel.x += limitedForce.x;
        this.vel.y += limitedForce.y;
        this.vel = limit(this.vel, this.maxSpeed);
    }

    isOutside(factor = 1) {
        return (
            this.pos.x - this.size > factor * canvas.width ||
            this.pos.x < -this.size - (factor - 1) * canvas.width ||
            this.pos.y - this.size > factor * canvas.height ||
            this.pos.y < -this.size - (factor - 1) * canvas.height
        );
    }
}
