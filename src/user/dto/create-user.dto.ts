import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    min,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @Matches('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
}
