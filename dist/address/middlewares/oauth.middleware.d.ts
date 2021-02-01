import { NestMiddleware } from '@nestjs/common';
export declare class OauthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): any;
}
