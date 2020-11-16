import { Response } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiResponseService {
  response(
    message: string[],
    status: string,
    code: number,
    data: any[] | any,
    res: Response,
  ): Response<ResponseModel> {
    return res.status(200).json({
      message,
      status,
      code,
      data,
    });
  }

  successResponse(
    message: string[],
    data: any,
    res: Response,
  ): Response<ResponseModel> {
    return res.status(200).json({
      message,
      status: 'success',
      code: 200,
      data,
    });
  }

  internalServerError(
    message: string[],
    res: Response,
  ): Response<ResponseModel> {
    return res.status(200).json({
      message,
      status: 'success',
      code: 200,
      data: null,
    });
  }
}
