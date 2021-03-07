"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const authorization_module_1 = require("./authorization/authorization.module");
const authentication_module_1 = require("./authentication/authentication.module");
const otp_module_1 = require("./otp/otp.module");
const user_module_1 = require("./user/user.module");
const address_module_1 = require("./address/address.module");
const password_module_1 = require("./password/password.module");
exports.routes = [
    {
        path: '/authorization',
        module: authorization_module_1.AuthorizationModule,
    },
    {
        path: '/authentication',
        module: authentication_module_1.AuthenticationModule,
    },
    {
        path: '/otp',
        module: otp_module_1.OtpModule,
    },
    {
        path: '/user',
        module: user_module_1.UserModule,
    },
    {
        path: '/address',
        module: address_module_1.AddressModule,
    },
    {
        path: '/password',
        module: password_module_1.PasswordModule,
    },
];
//# sourceMappingURL=route.js.map