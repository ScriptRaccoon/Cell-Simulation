import { canvas, ctx, threshold } from "../canvas.js";
import { randInt, distance, limit } from "../utils.js";

export class Body {
    static objectsOfType = {
        Body: [],
        Cell: [],
        Poison: [],
        Food: [],
        Helper: [],
    };

    static get allObjects() {
        return Object.values(Body.objectsOfType).flat();
    }

    constructor(x, y) {
        this.type = this.constructor.name;
        Body.objectsOfType[this.type].push(this);
        this.pos = {
            x: x || randInt(threshold, canvas.width - threshold),
            y: y || randInt(threshold, canvas.height - threshold),
        };
        this.size = 0;
        this.vel = { x: 0, y: 0 };
        this.alpha = 1;
        this.color = "#00FF00";
        this.maxForce = 0;
        this.maxSpeed = 0;
        this.time = 0;
        this.growDuration = 1;
        this.growSize = 10;
        this.isGrownUp = false;
    }

    remove() {
        Body.objectsOfType[this.type] = Body.objectsOfType[
            this.type
        ].filter((body) => body != this);
    }

    touches(body) {
        return distance(this.pos, body.pos) <= this.size + body.size;
    }

    growUp(deltaTime) {
        if (this.time <= this.growDuration / deltaTime) {
            const rate = this.time / (this.growDuration / deltaTime);
            this.size = Math.pow(rate, 3) * this.growSize;
        } else {
            this.isGrownUp = true;
        }
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    static drawAll() {
        for (const body of Body.allObjects) {
            body.draw();
        }
    }

    updatePos(deltaTime) {
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
    }

    update(deltaTime) {
        this.time++;
        this.applyFeatures(deltaTime);
        this.updatePos(deltaTime);
    }

    applyFeatures() {
        // overwritten in other classes
    }

    static updateAll(deltaTime) {
        for (const body of Body.allObjects) {
            body.update(deltaTime);
        }
    }

    applyForce(force) {
        const limitedForce = limit(force, this.maxForce);
        this.vel.x += limitedForce.x;
        this.vel.y += limitedForce.y;
        this.vel = limit(this.vel, this.maxSpeed);
    }

    get isOutside() {
        return (
            this.pos.x - this.size > canvas.width ||
            this.pos < -this.size ||
            this.pos.y - this.size > canvas.height ||
            this.pos.y < -this.size
        );
    }

    getClosestOfType(type, condition = () => true) {
        return Body.objectsOfType[type]
            .filter((b) => condition(b))
            .sort(
                (b, c) =>
                    distance(b.pos, this.pos) -
                    distance(c.pos, this.pos)
            )[0];
    }
}
