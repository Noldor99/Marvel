import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { PowerController } from './power.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, HeroSchema } from 'src/hero/schemas/hero.schema';
import { Power, PowerSchema } from './schemas/power.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
    MongooseModule.forFeature([{ name: Power.name, schema: PowerSchema }]),
  ],
  controllers: [PowerController],
  providers: [PowerService],
})
export class PowerModule {}
