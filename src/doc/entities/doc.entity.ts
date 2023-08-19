import { IsNumber, IsString, Min } from 'class-validator';

export class Doc {
    @IsNumber()
    @Min(0)
    version: number;

    @IsString()
    content;
}
