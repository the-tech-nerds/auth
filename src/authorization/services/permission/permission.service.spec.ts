import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePermissionService } from './update-permission.service';

describe('PermissionService', () => {
  let service: UpdatePermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatePermissionService],
    }).compile();

    service = module.get<UpdatePermissionService>(UpdatePermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
