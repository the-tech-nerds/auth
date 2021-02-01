"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressColumAdd1610442728726 = void 0;
class addressColumAdd1610442728726 {
    constructor() {
        this.name = 'addressColumAdd1610442728726';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `address` ADD `is_active` tinyint NOT NULL DEFAULT 0');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `address` DROP COLUMN `is_active`');
    }
}
exports.addressColumAdd1610442728726 = addressColumAdd1610442728726;
//# sourceMappingURL=1610442728726-address_colum_add.js.map