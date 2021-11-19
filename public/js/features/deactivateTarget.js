export const deactivateTarget = (body) => {
    if (body.target && body.touches(body.target)) {
        body.remove();
        body.target.active = false;
        body.target.alpha = 0.15;
    }
};
// can be used in eatFood.js
