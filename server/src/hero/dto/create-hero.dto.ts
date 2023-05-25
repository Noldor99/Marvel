import { ApiProperty } from '@nestjs/swagger';

export class CreateHerokDto {
  @ApiProperty({ default: 'Superman' })
  readonly nickname: string;

  @ApiProperty({ default: 'Clark Kent' })
  readonly real_name: string;

  @ApiProperty({
    default:
      'He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Kryptons destruction...',
  })
  readonly origin_description: string;

  @ApiProperty({
    default:
      'He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Kryptons destruction...',
  })
  readonly catch_phrase: string;
  @ApiProperty({
    default: 'Default title images',
  })
  readonly title_images: string;
}
