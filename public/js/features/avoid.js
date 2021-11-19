import { Body } from "../objects/Body.js";
import { difference, scale, distance } from "../utils.js";

export const avoid =
    ({ factor, type }) =>
    (body) => {
        for (const other of Body.objectsOfType[type]) {
            if (
                other.active &&
                distance(body.pos, other.pos) <=
                    factor * (body.size + other.size)
            ) {
                const force = difference(body.pos, other.pos);
                const avoidForce = scale(force, -1);
                body.applyForce(avoidForce);
            }
        }
    };
