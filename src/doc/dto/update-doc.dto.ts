import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDocDto {
    @IsNotEmpty()
    @IsNumber()
    version: number;

    @IsNotEmpty()
    @IsNumber()
    currentCursorIndex: number;

    @IsNumber()
    deletion: number;

    @IsString()
    insertion: string;
}
