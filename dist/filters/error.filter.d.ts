import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ApiResponseService } from '@the-tech-nerds/common-services';
export declare class ErrorFilter implements ExceptionFilter {
    private readonly apiResponseService;
    constructor(apiResponseService: ApiResponseService);
    catch(error: Error, host: ArgumentsHost): any;
}
