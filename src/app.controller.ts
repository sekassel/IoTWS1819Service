import { Get, Controller, UsePipes, ValidationPipe, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { WaterFill } from './water-fill.interface';
import { CreateWaterFillDto, UpdateWaterFillDto } from './dto';

@Controller('water-fill')
@UsePipes(new ValidationPipe())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() dto: CreateWaterFillDto): Promise<WaterFill> {
    return this.appService.create(dto);
  }

  @Get()
  async get(): Promise<WaterFill[]> {
    return this.appService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id): Promise<WaterFill> {
    return this.appService.getOne(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto: UpdateWaterFillDto): Promise<WaterFill> {
    return this.appService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<WaterFill> {
    const doc = await this.appService.getOne(id);
    await this.appService.delete(id);
    return doc;
  }
}