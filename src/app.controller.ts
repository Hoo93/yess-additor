import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    sayHello() {
        return 'Hello world';
    }
}
