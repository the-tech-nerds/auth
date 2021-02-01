import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserInfoUpdateRequest } from '../requests/user-info-update.request';
import { FetchUserInfoByIdService } from './fetch-user-info-by-id.servec';
import { UserResponse } from '../response/user.response';
export declare class UpdateUserInfoesService {
    private usersRepository;
    private fetchUserInfoByIdService;
    constructor(usersRepository: Repository<User>, fetchUserInfoByIdService: FetchUserInfoByIdService);
    execute(id: number, userInfoUpdateRequest: UserInfoUpdateRequest): Promise<UserResponse | undefined>;
}
