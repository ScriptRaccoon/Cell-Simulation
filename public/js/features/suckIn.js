import { population } from "../myPopulation.js";
import { difference, distance, scale } from "../utils.js";

export const suckIn =
    ({ range, maxSize, type }) =>
    (body) => {
        if (body.collapsing) return;
        for (const other of population.get(type)) {
            if (
                distance(body.pos, other.pos) <
                range + body.size + other.size
            ) {
                const force = scale(
                    difference(other.pos, body.pos),
                    100
                );
                other.applyForce(force);
            }
            if (body.touches(other)) {
                body.size += 0.1;
            }
        }
        if (body.size >= maxSize) {
            body.collapsing = true;
            for (const other of population.get(type)) {
                if (body.touches(other)) {
                    other.collapsing = true;
                }
            }
        }
    };
