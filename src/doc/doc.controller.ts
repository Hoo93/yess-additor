import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DocService } from './doc.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { UpdateDocDto } from './dto/update-doc.dto';

@Controller('doc')
@UseGuards(JwtAuthGuard)
export class DocController {
    constructor(private readonly docService: DocService) {}

    @Post()
    async updateDocs(@Body() updateDocDto: UpdateDocDto) {
        return this.docService.updateDocs(updateDocDto);
    }

    @Get()
    async getLatestDoc() {
        console.log('satrtsad');
        return this.docService.getLatestDoc();
    }
}
