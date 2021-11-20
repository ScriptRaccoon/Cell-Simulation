import { population } from "../myPopulation.js";

export const collapse = (body) => {
    if (!body.collapsing) return;
    if (!body.collapseTime) body.collapseTime = body.time;
    body.size /= 1.05;
    if (body.size <= 1) {
        population.remove(body);
    }
};
