import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getProfile(@Req() req) {
        return req.user;
    }

    @Post('/signin')
    async signin(@Body() userAuthDto: UserAuthDto) {
        return this.authService.validateUser(userAuthDto);
    }
}
