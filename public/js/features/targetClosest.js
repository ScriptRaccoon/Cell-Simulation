import { difference } from "../utils.js";

export const targetClosest = (type) => (body) => {
    if (body.avoiding) return;
    body.target = body.getClosestOfType(type);
    if (body.target) {
        const targetForce = difference(body.pos, body.target.pos);
        body.applyForce(targetForce);
    }
};
