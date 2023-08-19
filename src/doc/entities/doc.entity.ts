import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Doc {
    @IsNumber()
    @IsNotEmpty()
    version: number;

    @IsNotEmpty()
    @IsString()
    content: string;
}
