import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChangeService } from './change.service';
import { CreateChangeDto } from './dto/create-change.dto';
import { UpdateChangeDto } from './dto/update-change.dto';

@Controller('change')
export class ChangeController {
  constructor(private readonly changeService: ChangeService) {}

  @Post()
  create(@Body() createChangeDto: CreateChangeDto) {
    return this.changeService.create(createChangeDto);
  }

  @Get()
  findAll() {
    return this.changeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.changeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChangeDto: UpdateChangeDto) {
    return this.changeService.update(+id, updateChangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.changeService.remove(+id);
  }
}
