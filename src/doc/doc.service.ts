import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { Doc } from './entities/doc.entity';
import { ChangeService } from 'src/change/change.service';
import { Change } from 'src/change/entities/change.entity';
import { UpdateDocDto } from './dto/update-doc.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { throws } from 'assert';
import { changesMemory } from 'src/change/change.memory';

@UseGuards(JwtAuthGuard)
@Injectable()
export class DocService {
    constructor(private readonly changeService: ChangeService) {}

    private readonly docs: Doc[] = [
        {
            version: 0,
            content: 'This is my document.',
        },
    ];

    async getLatestDoc() {
        return this.docs[this.docs.length - 1];
    }

    // 10번 문서를 업데이트 했는데
    // 가장 최신 버전이 12번
    // getRecentVersion = 11
    // 10번 문서를 12버전까지 changeLog로 업데이트 해 내 현저 커서 구함
    // 12버전 문서 가져와서 현재 내 커서 위치에서 deletion, insertion 실행하고 13버전으로 저장
    // changeLog 에 12버전으로 로그 저장

    async updateDocs(updateDocDto: UpdateDocDto) {
        const { version, currentCursorIndex, deletion, insertion } = updateDocDto;

        if (version > (await this.getLatestDoc()).version) {
            throw new BadRequestException();
        }
        // 현재 버전에서 가장 최신 버전으로 업데이트 했을 때 커서의 위치
        let updatedCursorIndex = await this.getUpdatedCursorIndex(version, currentCursorIndex);

        const updatedContent = await this.applyChange(updatedCursorIndex, deletion, insertion);

        const newVersion = this.docs.length;
        const updatedDoc = new Doc(newVersion, updatedContent);

        this.docs.push(updatedDoc);
        const change = await this.changeService.createChange(updatedCursorIndex, deletion, insertion);
        changesMemory.push(change);
        return updatedDoc;
    }

    async applyChange(cursorIndex: number, deletion: number, insertion: string) {
        let updatedContent: string;
        // order by createdAt DESC LIMIT 1;
        const latestDocs = await this.getLatestDoc();
        if (cursorIndex - deletion > 0) {
            updatedContent = latestDocs.content.substring(0, cursorIndex - deletion);
        }
        updatedContent += insertion + latestDocs.content.substring(cursorIndex);

        return updatedContent;
    }

    async getUpdatedCursorIndex(version: number, currentCursorIndex: number) {
        let updatedCursorIndex = currentCursorIndex;

        const changesAfterVersion = await this.changeService.getChangesAfter(version);
        for (const change of changesAfterVersion) {
            if (currentCursorIndex <= change.cursorIndex - change.deletion) {
                continue;
            }
            if (currentCursorIndex < change.cursorIndex) {
                updatedCursorIndex = change.cursorIndex - change.deletion;
                if (updatedCursorIndex < 0) updatedCursorIndex = 0;
            }
        }

        return updatedCursorIndex;
    }
}
