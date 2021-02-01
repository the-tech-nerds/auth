"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uid = exports.getRandomInt = void 0;
exports.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
exports.uid = (len) => {
    const buf = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLen = chars.length;
    for (let i = 0; i < len; i += 1) {
        buf.push(chars[exports.getRandomInt(0, charLen - 1)]);
    }
    return buf.join('');
};
//# sourceMappingURL=utils.js.map