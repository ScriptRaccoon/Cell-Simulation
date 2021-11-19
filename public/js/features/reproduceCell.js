import { Cell } from "../objects/Cell.js";
import { Helper } from "../objects/Helper.js";
import { Immortal } from "../objects/Immortal.js";
import { STATE } from "../state.js";

export const reproduceCell = (pos, vel) => {
    if (Cell.number < Cell.maximalNumber) {
        if (Math.random() < Cell.helperChance && STATE.POISON_ON) {
            new Helper(pos, vel);
        } else if (
            Math.random() < Cell.immortalChance &&
            STATE.POISON_ON
        ) {
            new Immortal(pos, vel);
        } else {
            new Cell(pos, vel);
        }
    }
};
