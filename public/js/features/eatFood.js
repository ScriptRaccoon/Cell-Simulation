import { Body } from "../objects/Body.js";
import { Food } from "../objects/Food.js";
import { reproduceCell } from "./reproduceCell.js";

export const eatFood = (body) => {
    if (body.isGrownUp) {
        const food = Body.objectsOfType.Food.find(
            (food) => body.touches(food) && food.isGrownUp
        );
        if (food) {
            food.active = false;
            food.remove();
            Food.writeNumber();
            body.size += 1;
            body.maxSpeed /= 1.1;
            reproduceCell({ ...body.pos }, { ...body.vel });
            setTimeout(() => {
                if (Food.number < Food.maximalNumber) {
                    new Food();
                }
            }, 300);
        }
    }
};
