import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
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
    async findOne(@Param('email') email: string) {
        return this.userService.getUserByEmail(email);
    }

    @Patch(':email')
    async update(
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.updateUser(email, updateUserDto);
    }

    @Delete(':email')
    async remove(@Param('email') email: string) {
        return this.userService.remove(+email);
    }
}
