import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly usersLocalStorage: User[] = [
        { name: 'User A', email: 'sksk8922@gmail.com' },
        { name: 'User B', email: 'dev@yess.io' },
    ];

    createUser(createUserDto: CreateUserDto): User {
        if (this.getUserByEmail(createUserDto.email)) {
            throw new Error(`'${createUserDto.email}' is already is use.`);
        }
        this.usersLocalStorage.push(createUserDto);
        return createUserDto;
    }

    getAllUsers() {
        return this.usersLocalStorage;
    }

    getUserByEmail(email: string) {
        return this.usersLocalStorage.find((user) => user.email === email);
    }

    updateUser(email: string, updateUserDto: UpdateUserDto) {
        return `This action updates a #${email} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
