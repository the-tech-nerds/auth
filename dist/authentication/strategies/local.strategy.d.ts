import { Strategy } from 'passport-local';
import { UserValidationService } from '../services/user.validation.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userValidationService;
    constructor(userValidationService: UserValidationService);
    validate(request: any, username: string, password: string): Promise<any>;
}
export {};
