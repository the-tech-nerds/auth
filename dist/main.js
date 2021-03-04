"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const session = require("express-session");
const common_1 = require("@nestjs/common");
const common_services_1 = require("@the-tech-nerds/common-services");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const error_filter_1 = require("./filters/error.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await common_services_1.setBootstrap(app, {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'kfc-stream',
            },
        },
    });
    app.use(session({
        secret: 'nest cats',
        resave: false,
        saveUninitialized: false,
    }));
    app.useStaticAssets(path_1.join(__dirname, 'notifications', 'email', 'templates', 'assets'));
    app.setBaseViewsDir(path_1.join(__dirname, 'notification', 'email', 'templates'));
    app.setViewEngine('hbs');
    app.useGlobalFilters(new error_filter_1.ErrorFilter(new common_services_1.ApiResponseService()));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api/v1');
    await app.listen(3000);
}
void bootstrap();
//# sourceMappingURL=main.js.map