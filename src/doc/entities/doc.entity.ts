import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Doc {
    version: number;
    content: string;

    constructor(version: number, content: string) {
        this.version = version;
        this.content = content;
    }
}
