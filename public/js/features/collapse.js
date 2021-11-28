import { population } from "../myPopulation.js";

export const collapse =
    ({ maxAge }) =>
    (body) => {
        if (maxAge && body.time >= maxAge) body.collapsing = true;
        if (!body.collapsing) return;
        if (!body.collapseTime) body.collapseTime = body.time;
        body.size /= 1.05;
        if (body.size <= 1) {
            population.remove(body);
            population.onDie();
        }
    };
