import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/user-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(
        userAuthDto: UserAuthDto,
    ): Promise<{ accessToken: string }> {
        const user = await this.userService.getUserByEmail(userAuthDto.email);

        if (!user) {
            throw new UnauthorizedException(
                `User with email ${userAuthDto.email} doesn't exist`,
            );
        }

        if (user.name !== userAuthDto.name) {
            throw new UnauthorizedException('The user name does not match.');
        }

        return {
            accessToken: this.jwtService.sign(userAuthDto),
        };
    }
}
