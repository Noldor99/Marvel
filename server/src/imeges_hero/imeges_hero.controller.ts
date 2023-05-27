import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateImeges_heroDto } from './dto/create-imeges_hero.dto';
import { ImegesHeroService } from './imeges_hero.service';

@Controller('/imges')
@ApiTags('imges-hero')
export class ImegesHeroController {
  constructor(private readonly imegesHeroService: ImegesHeroService) {}

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
        heroId: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  addImg(@UploadedFiles() files, @Body() dto: CreateImeges_heroDto) {
    const { picture } = files;
    return this.imegesHeroService.addImg(dto, picture[0]);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imegesHeroService.removeImageHero(id);
  }
}
