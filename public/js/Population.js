import { clearCanvas } from "./canvas.js";
import { distance } from "./utils.js";
import { Cell } from "./objects/Cell.js";
import { Food } from "./objects/Food.js";

class Population {
    constructor(types) {
        this.types = types;
        this.list = {};
        for (const type of types) {
            this.list[type] = [];
        }
        this.maximums = {};
    }
    setMaximum(type, number) {
        this.maximums[type] = number;
    }
    getMaximum(type) {
        return this.maximums[type];
    }
    get(type) {
        return this.list[type];
    }
    getNumber(type) {
        return this.list[type].length;
    }
    add(body) {
        const type = body.type;
        this.list[type].push(body);
        if (this.list[type].length == 1) {
            $(`.cell-icon.${type.toLowerCase()}`).show();
            $(`#${type.toLowerCase()}Info`).show();
        }
        this.writeNumber(type);
    }
    writeNumber(type) {
        $(`#${type.toLowerCase()}Info`).text(
            `${this.getNumber(type)} ${type.toLowerCase()}s`
        );
    }
    update(deltaTime) {
        for (const type of this.types) {
            for (const body of this.get(type)) {
                body.update(deltaTime);
            }
        }
    }
    draw() {
        for (const type of this.types) {
            for (const body of this.get(type)) {
                body.draw();
            }
        }
    }
    remove(body) {
        const type = body.type;
        this.list[type] = this.list[type].filter((x) => x != body);
        this.writeNumber(type);
    }
    getClosestTo(body, type) {
        return this.list[type]
            .filter((b) => b.active)
            .sort(
                (b, c) =>
                    distance(b.pos, body.pos) -
                    distance(c.pos, body.pos)
            )[0];
    }
    start() {
        clearCanvas();
        for (const type of this.types) {
            this.list[type] = [];
            this.writeNumber(type);
        }
        new Cell();
        new Food();
    }
}

export const population = new Population([
    "BlackHole",
    "Body",
    "Poison",
    "Cell",
    "Food",
    "Helper",
    "Immortal",
]);

population.setMaximum("Food", 4);
population.setMaximum("Cell", 1000);
