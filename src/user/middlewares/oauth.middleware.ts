import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { CacheService } from '@technerds/common-services';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OauthMiddleware implements NestMiddleware {
  constructor(
    private readonly cacheService: CacheService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: () => void): Promise<any> {
    const accessToken = req.headers.access_token;
    const decoded: any = this.jwtService.decode(accessToken);

    if (!decoded) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id = null } = decoded;

    if (!decoded) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = await this.cacheService.get(`user-token-${id}`);

    if (accessToken === token) {
      next();
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
