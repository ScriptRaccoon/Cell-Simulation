import { rotate } from "../utils.js";

export const swim =
    ({ length, amplitude }) =>
    (body) => {
        const swimAngle =
            amplitude * Math.cos((body.time / length) * Math.PI);
        const swimForce = rotate(body.vel, swimAngle);
        body.applyForce(swimForce);
    };
