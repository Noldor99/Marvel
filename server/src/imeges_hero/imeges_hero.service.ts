import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { Hero, HeroDocument } from 'src/hero/schemas/hero.schema';

import { CreateImeges_heroDto } from './dto/create-imeges_hero.dto';
import { Image_hero, Image_heroDocument } from './schemas/image_hero.schema';

@Injectable()
export class ImegesHeroService {
  constructor(
    @InjectModel(Hero.name) private heroModel: Model<HeroDocument>,
    @InjectModel(Image_hero.name)
    private image_heroModel: Model<Image_heroDocument>,
    private fileService: FileService,
  ) {}

  async addImg(dto: CreateImeges_heroDto, picture): Promise<Image_hero> {
    const hero = await this.heroModel.findById(dto.heroId);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const image_hero = await this.image_heroModel.create({
      ...dto,
      image: picturePath,
    });
    hero.images_hero.push(image_hero._id);
    await hero.save();
    return image_hero;
  }

  async removeImageHero(id: string): Promise<string> {
    const img = await this.image_heroModel.findByIdAndRemove(id);
    if (!img) {
      throw new NotFoundException(`Power with ID ${id} not found`);
    }

    const heroes = await this.heroModel.find({ img: id });
    for (const hero of heroes) {
      hero.images_hero = hero.images_hero.filter(
        (imgId) => imgId.toString() !== id.toString(),
      );
      await hero.save();
    }
    return 'Image delete';
  }
}
