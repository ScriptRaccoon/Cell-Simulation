import { population } from "../myPopulation.js";

export const removeIfOutside = (body) => {
    if (body.isOutside()) {
        population.remove(body);
    }
};

export const removeIfFarOutside = (body) => {
    if (body.isOutside(2)) {
        population.remove(body);
    }
};
