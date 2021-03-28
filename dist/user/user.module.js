"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const save_file_service_1 = require("@the-tech-nerds/common-services/dist/upload/save-file.service");
const storage_entity_1 = require("./entities/storage.entity");
const user_entity_1 = require("./entities/user.entity");
const user_controller_1 = require("./controllers/user.controller");
const list_users_service_1 = require("./services/list-users.service");
const update_user_service_1 = require("./services/update-user.service");
const fetch_user_by_id_service_1 = require("./services/fetch-user-by-id.service");
const get_addresses_by_user_service_1 = require("./services/get-addresses-by-user.service");
const delete_user_service_1 = require("./services/delete-user.service");
const assign_role_in_user_service_1 = require("./services/assign-role-in-user.service");
const role_entity_1 = require("../authorization/entities/role.entity");
const fetch_user_info_by_id_servec_1 = require("./services/fetch-user-info-by-id.servec");
const update_user_info_service_1 = require("./services/update-user-info.service");
const verified_phone_service_1 = require("./services/verified-phone.service");
const update_phone_service_1 = require("./services/update-phone.service");
const update_email_service_1 = require("./services/update-email.service");
const fetch_user_by_phone_service_1 = require("./services/fetch-user-by-phone.service");
const fetch_user_by_email_service_1 = require("./services/fetch-user-by-email.service");
const update_user_freeze_status_service_1 = require("./services/update-user-freeze-status.service");
const user_mock_create_service_1 = require("./services/user-mock-create.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Roles, storage_entity_1.FileStorage]), common_services_1.CacheModule],
        providers: [
            common_services_1.ApiResponseService,
            list_users_service_1.ListUsersService,
            update_user_service_1.UpdateUsersService,
            fetch_user_by_id_service_1.FetchUserByIdService,
            get_addresses_by_user_service_1.GetAddressesByUserService,
            delete_user_service_1.DeleteUserService,
            assign_role_in_user_service_1.AssignRolesInUserService,
            fetch_user_info_by_id_servec_1.FetchUserInfoByIdService,
            update_user_info_service_1.UpdateUserInfoesService,
            verified_phone_service_1.UpdatePhoneVerifiedService,
            update_phone_service_1.UpdatePhoneService,
            common_services_1.UploadService,
            save_file_service_1.SaveFileService,
            update_email_service_1.UpdateEmailService,
            fetch_user_by_phone_service_1.FetchUserInfoByPhoneService,
            fetch_user_by_email_service_1.FetchUserInfoByEmailService,
            update_user_freeze_status_service_1.UpdateUserFreezeStatusService,
            user_mock_create_service_1.UserMockCreateService,
        ],
        exports: [update_user_service_1.UpdateUsersService],
        controllers: [user_controller_1.UserController],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map