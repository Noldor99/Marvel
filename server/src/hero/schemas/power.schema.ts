import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Hero } from './hero.schema';
import * as mongoose from 'mongoose';

export type PowerDocument = Power & Document;

@Schema()
export class Power {
  @Prop()
  superpowers: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' })
  hero: Hero;
}

export const PowerSchema = SchemaFactory.createForClass(Power);
