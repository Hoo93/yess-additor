import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    private readonly usersLocalStorage: User[] = [
        { name: 'User A', email: 'sksk8922@gmail.com' },
        { name: 'User B', email: 'dev@yess.io' },
    ];

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmail(createUserDto.email);

        if (user) {
            throw new Error(`'${createUserDto.email}' is already is use.`);
        }
        this.usersLocalStorage.push(createUserDto);
        return createUserDto;
    }

    async getAllUsers() {
        return this.usersLocalStorage;
    }

    async getUserByEmail(email: string) {
        return this.usersLocalStorage.find((user) => user.email === email);
    }
}
