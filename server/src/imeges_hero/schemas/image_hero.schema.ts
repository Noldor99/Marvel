import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Hero } from '../../hero/schemas/hero.schema';
import * as mongoose from 'mongoose';

export type Image_heroDocument = Image_hero & Document;

@Schema()
export class Image_hero {
  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' })
  image_hero: Hero;
}

export const Image_heroSchema = SchemaFactory.createForClass(Image_hero);
