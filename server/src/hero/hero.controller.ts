import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHerokDto } from './dto/create-hero.dto';
import { HeroService } from './hero.service';
import { CreateSuperpowersDto } from './dto/create-superpowers.dto';
import { CreateImeges_heroDto } from './dto/create-imeges_hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('/heros')
@ApiTags('heros')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Get()
  @ApiQuery({ name: 'count', required: false, description: 'User pagination' })
  @ApiQuery({ name: 'offset', required: false, description: 'User pagination' })
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.heroService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.heroService.search(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the hero' })
  getOne(@Param('id') id: ObjectId) {
    return this.heroService.getOne(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        picture: {
          type: 'string',
          format: 'binary',
        },
        nickname: {
          type: 'string',
        },
        real_name: {
          type: 'string',
        },
        origin_description: {
          type: 'string',
        },
        catch_phrase: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateHerokDto) {
    console.log(files);
    const { picture } = files;
    return this.heroService.create(dto, picture[0]);
  }

  @Post('/imges')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        picture: {
          type: 'string',
          format: 'binary',
        },
        heroId: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  addImg(@UploadedFiles() files, @Body() dto: CreateImeges_heroDto) {
    const { picture } = files;
    return this.heroService.addImg(dto, picture[0]);
  }

  @Post('/power')
  addPower(@Body() dto: CreateSuperpowersDto) {
    return this.heroService.addPower(dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'Simple' })
  delete(@Param('id') id: ObjectId) {
    return this.heroService.delete(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        picture: {
          type: 'string',
          format: 'binary',
        },
        nickname: {
          type: 'string',
        },
        real_name: {
          type: 'string',
        },
        origin_description: {
          type: 'string',
        },
        catch_phrase: {
          type: 'string',
        },
      },
    },
  })
  @ApiParam({ name: 'id', required: true, description: 'Simple' })
  async updateHero(
    @Param('id') id: string,
    @Body() updateHeroDto: UpdateHeroDto,
  ) {
    return this.heroService.updateHero(id, updateHeroDto);
  }
}
