"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_services_1 = require("@the-tech-nerds/common-services");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("@the-tech-nerds/common-services/dist/guards/roles/roles.guard");
const authorization_controller_1 = require("./authorization.controller");
const create_permision_category_service_1 = require("./services/permission-category/create-permision-category.service");
const list_permission_category_service_1 = require("./services/permission-category/list-permission-category.service");
const update_permission_category_service_1 = require("./services/permission-category/update-permission-category.service");
const delete_permission_category_service_1 = require("./services/permission-category/delete-permission-category.service");
const create_role_service_1 = require("./services/role/create-role.service");
const list_role_service_1 = require("./services/role/list-role.service");
const update_role_service_1 = require("./services/role/update-role.service");
const delete_role_service_1 = require("./services/role/delete-role.service");
const create_permission_service_1 = require("./services/permission/create-permission.service");
const list_permission_service_1 = require("./services/permission/list-permission.service");
const update_permission_service_1 = require("./services/permission/update-permission.service");
const delete_permission_service_1 = require("./services/permission/delete-permission.service");
const permission_category_controller_1 = require("./controllers/permission-category.controller");
const role_controller_1 = require("./controllers/role.controller");
const permission_controller_1 = require("./controllers/permission.controller");
const getById_permission_service_1 = require("./services/permission/getById-permission.service");
const oauth_controller_1 = require("./controllers/oauth.controller");
const create_client_service_1 = require("./services/oauth/create-client.service");
const serialize_client_service_1 = require("./services/oauth/serialize-client.service");
const deserialize_client_service_1 = require("./services/oauth/deserialize-client.service");
const grant_service_1 = require("./services/oauth/grant.service");
const exchange_service_1 = require("./services/oauth/exchange.service");
const authorize_service_1 = require("./services/oauth/authorize.service");
const initialize_oauth_server_service_1 = require("./services/oauth/initialize-oauth-server.service");
const token_service_1 = require("./services/oauth/token.service");
const permission_category_entity_1 = require("./entities/permission-category.entity");
const permission_entity_1 = require("./entities/permission.entity");
const role_entity_1 = require("./entities/role.entity");
const client_entity_1 = require("./entities/client.entity");
const access_code_entity_1 = require("./entities/access-code.entity");
const access_token_entity_1 = require("./entities/access-token.entity");
const get_by_id_role_service_1 = require("./services/role/get-by-id-role.service");
const assign_permission_in_role_service_1 = require("./services/role/assign-permission-in-role.service");
const constants_1 = require("../authentication/constants");
let AuthorizationModule = class AuthorizationModule {
};
AuthorizationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                permission_category_entity_1.PermissionCategories,
                permission_entity_1.Permissions,
                role_entity_1.Roles,
                client_entity_1.Client,
                access_code_entity_1.AccessCode,
                access_token_entity_1.AccessToken,
            ]),
            common_services_1.CacheModule,
            common_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' },
            }),
        ],
        providers: [
            common_services_1.ApiResponseService,
            create_permision_category_service_1.CreatePermissionCategoryService,
            list_permission_category_service_1.ListPermissionCategoryService,
            update_permission_category_service_1.UpdatePermissionCategoryService,
            delete_permission_category_service_1.DeletePermissionCategoryService,
            create_role_service_1.CreateRoleService,
            list_role_service_1.ListRoleService,
            update_role_service_1.UpdateRoleService,
            delete_role_service_1.DeleteRoleService,
            assign_permission_in_role_service_1.AssignPermissionInRoleService,
            create_permission_service_1.CreatePermissionService,
            list_permission_service_1.ListPermissionService,
            update_permission_service_1.UpdatePermissionService,
            delete_permission_service_1.DeletePermissionService,
            getById_permission_service_1.GetByIdPermissionService,
            create_client_service_1.CreateClientService,
            serialize_client_service_1.SerializeClientService,
            deserialize_client_service_1.DeserializeClientService,
            grant_service_1.GrantService,
            exchange_service_1.ExchangeService,
            authorize_service_1.AuthorizeService,
            token_service_1.TokenService,
            initialize_oauth_server_service_1.InitializeOauthServerService,
            get_by_id_role_service_1.GetByIdRoleService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: common_services_1.PermissionsGuard,
            },
        ],
        controllers: [
            authorization_controller_1.AuthorizationController,
            permission_category_controller_1.PermissionCategoryController,
            role_controller_1.RoleController,
            permission_controller_1.PermissionController,
            oauth_controller_1.OauthController,
        ],
    })
], AuthorizationModule);
exports.AuthorizationModule = AuthorizationModule;
//# sourceMappingURL=authorization.module.js.map