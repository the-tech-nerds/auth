import { Response } from 'express';

export class BaseController {
  response(message: string[], status: string, code: number, data: any[] | any, res: Response): Response<ResponseModel> {
    return res.status(200).json({ message, status, code, data });
  }
}
