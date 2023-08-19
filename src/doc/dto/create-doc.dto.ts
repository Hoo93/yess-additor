import { IsNumber, IsString, Min } from 'class-validator';

export class CreateDocDto {
    @IsNumber()
    @Min(0)
    version: number;

    @IsString()
    content;
}
