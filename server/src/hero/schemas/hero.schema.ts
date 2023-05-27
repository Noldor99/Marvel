import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Power } from '../../power/schemas/power.schema';
import { Image_hero } from '../../imeges_hero/schemas/image_hero.schema';

export type HeroDocument = Hero & Document;

@Schema()
export class Hero {
  @Prop()
  nickname: string;

  @Prop()
  real_name: string;

  @Prop()
  origin_description: string;

  @Prop()
  catch_phrase: string;

  @Prop()
  title_images: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Power' }] })
  powers: Power[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image_hero' }] })
  images_hero: Image_hero[];
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
