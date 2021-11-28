import { population } from "../myPopulation.js";

export const slowDown = (type) => (body) => {
    const other = population
        .get(type)
        .find((b) => body.touches(b) && b.isGrownUp);
    if (other) {
        other.maxSpeed /= 1.01;
        if (other.maxSpeed <= 1) {
            other.maxSpeed = 0;
            other.maxForce = 0;
        }
    }
};
