import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero, HeroDocument } from './schemas/hero.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateHerokDto } from './dto/create-hero.dto';
import { FileService, FileType } from '../file/file.service';
import {
  Image_hero,
  Image_heroDocument,
} from '../imeges_hero/schemas/image_hero.schema';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero.name) private heroModel: Model<HeroDocument>,
    @InjectModel(Image_hero.name)
    private image_heroModel: Model<Image_heroDocument>,
    private fileService: FileService,
  ) {}

  async getAll(count = 10, offset = 0): Promise<Hero[]> {
    const heros = await this.heroModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return heros;
  }

  async getOne(id: ObjectId): Promise<Hero> {
    const hero = await this.heroModel
      .findById(id)
      .populate('powers')
      .populate('images_hero');
    return hero;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const hero = await this.heroModel.findByIdAndDelete(id);
    return hero._id;
  }

  async create(dto: CreateHerokDto, picture): Promise<Hero> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const hero = await this.heroModel.create({
      ...dto,
      title_images: picturePath,
    });
    return hero;
  }

  async search(query: string): Promise<Hero[]> {
    const heros = await this.heroModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return heros;
  }

  async updateHero(
    id: string,
    updateHeroDto: UpdateHeroDto,
    picture,
  ): Promise<Hero> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const hero = await this.heroModel.findByIdAndUpdate(
      id,
      {
        ...updateHeroDto,
        title_images: picturePath,
      },
      { new: true },
    );

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    return hero;
  }
}
