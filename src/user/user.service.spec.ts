import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('createUser', () => {
        let createUserDto: CreateUserDto;
        let mockedUser: User;

        beforeEach(() => {
            createUserDto = {
                email: 'test@example.com',
                name: 'Test User',
            };

            mockedUser = {
                name: 'Test User',
                email: 'Test Email',
            };
        });

        it('should be function', () => {
            expect(typeof userService.createUser).toBe('function');
        });

        it('should return user', async () => {
            const spyGetUserByEmail = jest
                .spyOn(userService, 'getUserByEmail')
                .mockResolvedValue(null);

            const result = await userService.createUser(createUserDto);
            expect(spyGetUserByEmail).toBeCalledTimes(1);
            expect(result.name).toEqual(createUserDto.name);
            expect(result.email).toEqual(createUserDto.email);
        });

        it('should throw Error when same email in storage', async () => {
            const spyGetUserByEmail = jest
                .spyOn(userService, 'getUserByEmail')
                .mockResolvedValue(mockedUser);

            await expect(userService.createUser(createUserDto)).rejects.toThrow(
                Error,
            );
            expect(spyGetUserByEmail).toBeCalledTimes(1);
        });
    });
});
