import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero, HeroDocument } from './schemas/hero.schema';
import { Model, ObjectId } from 'mongoose';
import { Power, PowerDocument } from './schemas/power.schema';
import { CreateHerokDto } from './dto/create-hero.dto';
import { CreateSuperpowersDto } from './dto/create-superpowers.dto';
import { FileService, FileType } from '../file/file.service';
import { CreateImeges_heroDto } from './dto/create-imeges_hero.dto';
import { Image_hero, Image_heroDocument } from './schemas/image_hero.schema';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero.name) private heroModel: Model<HeroDocument>,
    @InjectModel(Power.name) private powerModel: Model<PowerDocument>,
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

  async addPower(dto: CreateSuperpowersDto): Promise<Power> {
    const hero = await this.heroModel.findById(dto.heroId);
    const power = await this.powerModel.create({ ...dto });
    hero.powers.push(power._id);
    await hero.save();
    return power;
  }

  async create(dto: CreateHerokDto, picture): Promise<Hero> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const hero = await this.heroModel.create({
      ...dto,
      title_images: picturePath,
    });
    return hero;
  }

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

  async search(query: string): Promise<Hero[]> {
    const heros = await this.heroModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return heros;
  }

  async updateHero(id: string, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    const hero = await this.heroModel.findByIdAndUpdate(id, updateHeroDto, {
      new: true,
    });

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    return hero;
  }
}
