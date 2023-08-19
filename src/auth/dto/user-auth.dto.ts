import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
