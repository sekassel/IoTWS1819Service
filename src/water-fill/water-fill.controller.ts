import { Get, Controller, UsePipes, ValidationPipe, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';

import { WaterFillService } from './water-fill.service';
import { WaterFill } from './water-fill.interface';
import { CreateWaterFillDto, UpdateWaterFillDto } from './dto';

@Controller('water-fill')
@UsePipes(new ValidationPipe())
export class WaterFillController {
  constructor(private readonly appService: WaterFillService) {}

  @Post()
  async create(@Body() dto: CreateWaterFillDto): Promise<WaterFill> {
    return this.appService.create(dto);
  }

  @Get()
  async get(@Query('timestamp') timestamp: number): Promise<WaterFill[]> {
    return this.appService.getAll(timestamp);
  }

  @Get('/last')
  async getLast(): Promise<WaterFill> {
    return this.appService.getLast();
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

  @Get('action/on')
  async activate(): Promise<string> {
    const result = await this.appService.sendActionOn();
    return result.statusText;
  }

  @Get('action/off')
  async deactivate(): Promise<string> {
    const result = await this.appService.sendActionOff();
    return result.statusText;
  }

  @Get('/tank/status')
  async getTankStatus(): Promise<boolean> {
    const lastValue = (await this.getLast()).value;
    if (lastValue > 0.2) {
      return true;
    } else {
      return false;
    }
  }
}
