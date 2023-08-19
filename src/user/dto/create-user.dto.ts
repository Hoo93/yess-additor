import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEmail()
    name: string;
}
