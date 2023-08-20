import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
    email: string;
    name: string;

    constructor(email: string, name: string) {
        this.email = email;
        this.name = name;
    }
}
