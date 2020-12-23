import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { ApiResponseService } from '@technerds/common-services';
import { response, Response } from 'express';
import { CreateClientService } from '../services/oauth/create-client.service';
import { Client } from '../entities/client.entity';
import { AuthorizeService } from '../services/oauth/authorize.service';
import { TokenService } from '../services/oauth/token.service';
import { ClientRequest } from '../requests/client.request';
import { TokenRequest } from '../requests/token.request';

@Controller()
export class OauthController {
  constructor(
    private readonly apiResponseService: ApiResponseService,
    private readonly createClientService: CreateClientService,
    private readonly authorizeService: AuthorizeService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/client')
  async createClient(
    @Body() clientRequest: ClientRequest,
    @Res() res: Response,
  ): Promise<Response<ResponseModel>> {
    try {
      const client = await this.createClientService.create(clientRequest);
      return this.apiResponseService.successResponse(
        ['Client created successfully'],
        client as Client,
        res,
      );
    } catch (e) {
      return this.apiResponseService.internalServerError(
        [`Client creation failed. Reasons: ${e.message}`],
        response,
      );
    }
  }

  @Get('oauth/authorize')
  async authorization(@Req() req: any, @Res() res: any, @Next() next: any) {
    const authorization = await this.authorizeService.authorize();
    req.user = {
      id: req.query.user_id,
      user_id: req.query.client_id,
    };
    return authorization(req, res, next);
  }

  @Get('oauth/token')
  async getToken(@Req() req: any, @Res() res: any) {
    return this.apiResponseService.successResponse(
      ['Authorization successful'],
      {
        code: req.query.code,
      },
      res,
    );
  }

  @Post('oauth/token')
  async authorizationToken(
    @Body() tokenRequest: TokenRequest,
    @Req() req: any,
    @Res() res: any,
    @Next() next: any,
  ) {
    const tokenHandler = await this.tokenService.execute();
    const { client_id: id, secret } = tokenRequest;
    req.client = {
      id,
      secret,
    };
    return tokenHandler(req, res, next);
  }
}
