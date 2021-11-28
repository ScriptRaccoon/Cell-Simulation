import { clearCanvas } from "./canvas.js";
import { distance } from "./utils.js";

export class Population {
    constructor({
        types,
        init,
        phase,
        phaseTitles,
        reproduce,
        status,
        onDie,
    }) {
        this.types = types || [];
        this.list = {};
        for (const type of types) {
            this.list[type] = [];
        }
        this.init = init || (() => {});
        this.phase = phase || (() => {});
        this.phaseTitles = phaseTitles || [];
        this.reproduce = reproduce || (() => {});
        this.status = status || {};
        this.onDie = onDie || (() => {});
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
        this.init();
    }
    writePhase() {
        $("#phaseNumber").text(this.phase() || 0);
        $("#phaseTitle").text(this.phaseTitles[this.phase()] || "");
    }
}
