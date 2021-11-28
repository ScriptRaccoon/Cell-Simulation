import { population } from "../myPopulation.js";

export const deactivateTarget = (body) => {
    if (body.target && body.touches(body.target)) {
        population.remove(body);
        body.target.active = false;
        body.target.alpha = 0.15;
    }
};
