import { population } from "../myPopulation.js";

export const maxAge = (age) => (body) => {
    if (body.time >= age) {
        population.remove(body);
        population.onDie();
    }
};
