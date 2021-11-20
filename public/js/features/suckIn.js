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
                    10
                );
                other.applyForce(force);
                if (body.touches(other)) {
                    if (!other.suckedIn) {
                        other.suckedIn = true;
                        body.size++;
                    }
                    if (body.size >= maxSize) {
                        body.collapsing = true;
                        other.collapsing = true;
                    }
                } else {
                    other.suckedIn = false;
                }
            }
        }
    };
