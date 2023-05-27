import { Module } from '@nestjs/common';
import { ImegesHeroService } from './imeges_hero.service';
import { ImegesHeroController } from './imeges_hero.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HeroSchema } from 'src/hero/schemas/hero.schema';
import {
  Image_hero,
  Image_heroSchema,
} from 'src/imeges_hero/schemas/image_hero.schema';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
    MongooseModule.forFeature([
      { name: Image_hero.name, schema: Image_heroSchema },
    ]),
  ],
  controllers: [ImegesHeroController],
  providers: [ImegesHeroService, FileService],
})
export class ImegesHeroModule {}
