import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEmail()
    name: string;
}
