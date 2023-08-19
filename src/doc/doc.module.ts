import { Module } from '@nestjs/common';
import { DocService } from './doc.service';
import { DocController } from './doc.controller';
import { ChangeService } from 'src/change/change.service';
import { ChangeModule } from 'src/change/change.module';

@Module({
    imports: [ChangeModule],
    controllers: [DocController],
    providers: [DocService, ChangeService],
})
export class DocModule {}
