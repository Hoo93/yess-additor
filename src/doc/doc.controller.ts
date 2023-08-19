import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DocService } from './doc.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('doc')
@UseGuards(JwtAuthGuard)
export class DocController {
    constructor(private readonly docService: DocService) {}

    @Post()
    updateDocs(@Body() updateDocDto) {
        // return this.docService.updateDocs(updateDocDto);
    }
}
