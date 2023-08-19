import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':email')
    async findOne(@Param('email') email: string) {
        return this.usersService.getUserByEmail(email);
    }

    @Patch(':email')
    async update(
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.updateUser(email, updateUserDto);
    }

    @Delete(':email')
    async remove(@Param('email') email: string) {
        return this.usersService.remove(+email);
    }
}
