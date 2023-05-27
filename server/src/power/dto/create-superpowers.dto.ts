import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuperpowersDto {
  @ApiProperty({ default: 'wealthy' })
  readonly superpowers: string;

  @ApiProperty()
  readonly heroId: ObjectId;
}
