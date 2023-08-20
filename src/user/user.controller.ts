import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }
}
