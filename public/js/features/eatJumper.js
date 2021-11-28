import { population } from "../myPopulation.js";
import { Immortal } from "../objects/Immortal.js";
import { Jumper } from "../objects/Jumper.js";

export const eatJumper = (body) => {
    if (body.isGrownUp) {
        const jumper = population
            .get("Jumper")
            .find((jumper) => body.touches(jumper));
        if (jumper && jumper.maxSpeed == 0) {
            population.remove(jumper);
            body.size += 1;
            body.maxSpeed /= 1.1;
            setTimeout(() => {
                population.reproduce(
                    { ...body.pos },
                    { ...body.vel }
                );
            }, 300);
        }
    }
};
