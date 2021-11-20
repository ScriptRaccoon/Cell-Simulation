import { Food } from "../objects/Food.js";
import { population } from "../myPopulation.js";

export const eatFood = (body) => {
    if (body.isGrownUp) {
        const food = population
            .get("Food")
            .find((food) => body.touches(food) && food.isGrownUp);
        if (food) {
            food.active = false;
            population.remove(food);
            body.size += 1;
            body.maxSpeed /= 1.1;
            population.reproduce({ ...body.pos }, { ...body.vel });
            setTimeout(() => {
                if (
                    population.getNumber("Food") <
                    population.getMaximum("Food")
                ) {
                    new Food();
                }
            }, 300);
        }
    }
};
