import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HeroSchema } from './schemas/hero.schema';
import { Power, PowerSchema } from './schemas/power.schema';
import { FileService } from '../file/file.service';
import { HeroService } from './hero.service';
import { Image_hero, Image_heroSchema } from './schemas/image_hero.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
    MongooseModule.forFeature([{ name: Power.name, schema: PowerSchema }]),
    MongooseModule.forFeature([
      { name: Image_hero.name, schema: Image_heroSchema },
    ]),
  ],
  controllers: [HeroController],
  providers: [HeroService, FileService],
})
export class HeroModule {}
