import { IsNotEmpty, IsNumber, IsString, Min, min } from 'class-validator';
import { verify } from 'crypto';

export class Change {
    version: number;
    cursorIndex: number;
    deletion: number;
    insertion: string;

    constructor(version: number, cursorIndex: number, deletion: number, insertion: string) {
        this.version = version;
        this.cursorIndex = cursorIndex;
        this.deletion = deletion;
        this.insertion = insertion;
    }
}
