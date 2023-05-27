import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImeges_heroDto {
  @ApiProperty({ default: 'simple imge' })
  readonly image: string;

  @ApiProperty()
  readonly heroId: ObjectId;
}
