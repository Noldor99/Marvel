import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { CreateSuperpowersDto } from './dto/create-superpowers.dto';
import { PowerService } from './power.service';

@Controller('/power')
@ApiTags('power')
export class PowerController {
  constructor(private readonly powerService: PowerService) {}

  @Post()
  addPower(@Body() dto: CreateSuperpowersDto) {
    return this.powerService.addPower(dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'Simple' })
  remove(@Param('id') id: string) {
    return this.powerService.removePower(id);
  }
}
