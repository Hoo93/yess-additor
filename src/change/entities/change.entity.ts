import { IsNotEmpty, IsNumber, IsString, Min, min } from 'class-validator';

export class Change {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    version: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    cursorIndex: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    deletion: number;

    @IsNotEmpty()
    @IsString()
    insertion: string;
}
