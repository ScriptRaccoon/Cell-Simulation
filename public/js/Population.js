import { clearCanvas } from "./canvas.js";
import { distance } from "./utils.js";
import { Cell } from "./objects/Cell.js";
import { Helper } from "./objects/Helper.js";
import { Food } from "./objects/Food.js";
import { Immortal } from "./objects/Immortal.js";
import { Poison } from "./objects/Poison.js";
import { BlackHole } from "./objects/BlackHole.js";

class Population {
    constructor(types, phaseTitles) {
        this.types = types;
        this.phaseTitles = phaseTitles;
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
        this.writePhase();
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
        this.writePhase();
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
        // should be decoupled. too special here.
        new Cell();
        new Food();
    }
    get phase() {
        // should be decoupled. too special here.
        const cellNumber = this.getNumber("Cell");
        return Math.floor(cellNumber / 100);
    }
    writePhase() {
        $("#phaseNumber").text(this.phase);
        $("#phaseTitle").text(this.phaseTitles[this.phase] || "");
    }
}

// should go in separate file

export const population = new Population(
    [
        "BlackHole",
        "Body",
        "Poison",
        "Cell",
        "Food",
        "Helper",
        "Immortal",
    ],
    [
        "Looking for food",
        "Group dynamics",
        "Poison alert",
        "Helpers arrive",
        "I will survive",
        "Don't get trapped!",
    ]
);

population.setMaximum("Food", 4);
population.setMaximum("Cell", 1000);

population.reproduce = (pos, vel) => {
    if (
        population.phase >= 2 &&
        population.phase <= 4 &&
        Math.random() < 0.2
    ) {
        new Poison();
    }
    if (population.phase >= 5 && Math.random() < 0.01) {
        new BlackHole();
    } else if (population.phase >= 4 && Math.random() < 0.1) {
        new Immortal(pos, vel);
    } else if (
        population.phase >= 3 &&
        population.phase <= 4 &&
        Math.random() < 0.1
    ) {
        new Helper(pos, vel);
    } else if (
        population.getNumber("Cell") < population.getMaximum("Cell")
    ) {
        new Cell(pos, vel);
    }
};
