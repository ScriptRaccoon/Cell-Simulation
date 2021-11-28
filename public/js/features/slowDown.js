import { population } from "../myPopulation.js";

export const slowDown = (type, factor) => (body) => {
    for (const other of population.get(type)) {
        if (body.touches(other) && other.isGrownUp) {
            other.maxSpeed /= factor;
            if (other.maxSpeed <= 1) {
                other.maxSpeed = 0;
                other.maxForce = 0;
            }
        }
    }
};
