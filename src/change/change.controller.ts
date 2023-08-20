import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChangeService } from './change.service';

@Controller('change')
export class ChangeController {
    constructor(private readonly changeService: ChangeService) {}

    @Get()
    async getAllChanges() {
        return this.changeService.getAllChanges();
    }
}
