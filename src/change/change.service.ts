import { Injectable } from '@nestjs/common';
import { Change } from './entities/change.entity';
import { changesMemory } from './change.memory';

@Injectable()
export class ChangeService {
    async getAllChanges() {
        return changesMemory;
    }

    async createChange(cursorIndex: number, deletion: number, insertion: string) {
        const change = new Change(changesMemory.length, cursorIndex, deletion, insertion);
        changesMemory.push(change);
        return change;
    }

    async getRecentChangeVersion() {
        return changesMemory.length - 1;
    }

    async getChangesAfter(version: number) {
        if (version === 0) {
            return changesMemory;
        }
        return changesMemory.splice(version - 1);
    }

    async getChangeByVersion(version: number) {
        return changesMemory[version];
    }
}
