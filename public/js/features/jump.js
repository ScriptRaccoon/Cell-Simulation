import { canvas, threshold } from "../canvas.js";
import { difference, distance, randInt, scale } from "../utils.js";

export const jump =
    ({ range, wait }) =>
    (body) => {
        if (!body.isGrownUp) return;
        if (
            body.target &&
            body.duringJump &&
            distance(body.pos, body.target) <= range
        ) {
            body.vel = { x: 0, y: 0 };
            body.duringJump = false;
            body.target = null;
            body.startedWaiting = body.time;
            return;
        } else if (body.duringJump) return;
        if (
            body.startedWaiting &&
            body.time - body.startedWaiting < wait
        )
            return;
        body.duringJump = true;
        body.target = {
            x: randInt(threshold, canvas.width - threshold),
            y: randInt(threshold, canvas.height - threshold),
        };
        const force = difference(body.pos, body.target);
        body.applyForce(force);
    };
