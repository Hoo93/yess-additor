import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Payload } from './jwt/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from './dto/userAuth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
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

        return {
            accessToken: this.jwtService.sign(userAuthDto),
        };
    }
}
