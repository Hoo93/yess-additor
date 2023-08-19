import { Injectable } from '@nestjs/common';
import { CreateChangeDto } from './dto/create-change.dto';
import { UpdateChangeDto } from './dto/update-change.dto';
import { Change } from './entities/change.entity';

@Injectable()
export class ChangeService {
    private readonly changes: Change[] = [
        {
            version: 0,
            cursorIndex: 10,
            deletion: 2,
            insertion: 'XYZ',
        },
    ];

    createChange(cursorIndex: number, deletion: number, insertion: string) {
        const change = {
            version: this.changes.length,
            cursorIndex: cursorIndex,
            deletion: deletion,
            insertion: insertion,
        };

        this.changes.push(change);
        return change;
    }

    getRecentChangeVersion() {
        return this.changes.length - 1;
    }

    getChangesAfter(version: number) {
        if (version === 0) {
            return this.changes;
        }
        return this.changes.splice(version - 1);
    }

    getChangeByVersion(version: number) {
        return this.changes[version];
    }
}
