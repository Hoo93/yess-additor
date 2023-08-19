import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/userAuth.dto';
import { User } from 'src/users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { symlink } from 'fs';

describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UsersService, JwtService],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('validateUser', () => {
        it('should be defined', () => {
            expect(authService).toBeDefined();
        });

        it('should validate user and return access token', async () => {
            const userAuthDto: UserAuthDto = {
                email: 'test@example.com',
                name: 'Test User',
            };

            const mockedUser: User = {
                name: 'Test User',
                email: 'Test Email',
            };

            const spyGetUserByEmail = jest
                .spyOn(usersService, 'getUserByEmail')
                .mockResolvedValue(mockedUser);

            const spySign = jest
                .spyOn(jwtService, 'sign')
                .mockReturnValue('mockedAccessToken');

            const result = await authService.validateUser(userAuthDto);

            expect(spyGetUserByEmail).toHaveBeenCalledWith(userAuthDto.email);
            expect(spySign).toHaveBeenCalledWith(userAuthDto);
            expect(result).toEqual({ accessToken: 'mockedAccessToken' });
        });

        it('should throw UnauthorizedException when user does not exist', async () => {
            const userAuthDto: UserAuthDto = {
                email: 'test@example.com',
                name: 'Test User',
            };

            const spyGetUserByEmail = jest
                .spyOn(usersService, 'getUserByEmail')
                .mockResolvedValue(null);

            await expect(authService.validateUser(userAuthDto)).rejects.toThrow(
                UnauthorizedException,
            );
            expect(spyGetUserByEmail).toBeCalledTimes(1);
        });

        it('should throw UnauthorizedException for invalid user name', async () => {
            const userAuthDto: UserAuthDto = {
                email: 'test@example.com',
                name: 'Test User',
            };

            const mockedUser: User = {
                name: 'Error Test User',
                email: 'Test Email',
            };

            const spyGetUserByEmail = jest
                .spyOn(usersService, 'getUserByEmail')
                .mockResolvedValue(mockedUser);

            await expect(authService.validateUser(userAuthDto)).rejects.toThrow(
                UnauthorizedException,
            );
            expect(spyGetUserByEmail).toBeCalledTimes(1);
        });
    });
});
