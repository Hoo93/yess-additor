import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { UserAuthDto } from './auth/dto/userAuth.dto';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';

@Controller()
export class AppController {
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
