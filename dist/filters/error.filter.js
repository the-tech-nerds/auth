"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
let ErrorFilter = class ErrorFilter {
    constructor(apiResponseService) {
        this.apiResponseService = apiResponseService;
    }
    catch(error, host) {
        const response = host.switchToHttp().getResponse();
        const status = error instanceof common_1.HttpException
            ? error.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (status === common_1.HttpStatus.BAD_REQUEST) {
            return this.apiResponseService.badRequestError([error.message], response);
        }
        if (status === common_1.HttpStatus.UNAUTHORIZED) {
            return this.apiResponseService.unAuthorizedError([error.message], response);
        }
        if (status === common_1.HttpStatus.FORBIDDEN) {
            return this.apiResponseService.forbiddenError([error.message], response);
        }
        if (status === common_1.HttpStatus.NOT_FOUND) {
            return this.apiResponseService.notFoundError([error.message], response);
        }
        return this.apiResponseService.internalServerError([error.message], response);
    }
};
ErrorFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [common_services_1.ApiResponseService])
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=error.filter.js.map