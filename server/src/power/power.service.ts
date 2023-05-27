import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Hero, HeroDocument } from 'src/hero/schemas/hero.schema';
import { CreateSuperpowersDto } from './dto/create-superpowers.dto';
import { Power, PowerDocument } from './schemas/power.schema';

@Injectable()
export class PowerService {
  constructor(
    @InjectModel(Hero.name) private heroModel: Model<HeroDocument>,
    @InjectModel(Power.name) private powerModel: Model<PowerDocument>,
  ) {}

  async addPower(dto: CreateSuperpowersDto): Promise<Power> {
    const hero = await this.heroModel.findById(dto.heroId);
    const power = await this.powerModel.create({ ...dto });
    hero.powers.push(power._id);
    await hero.save();
    return power;
  }

  async removePower(id: string): Promise<string> {
    const power = await this.powerModel.findByIdAndRemove(id);
    if (!power) {
      throw new NotFoundException(`Power with ID ${id} not found`);
    }

    const heroes = await this.heroModel.find({ powers: id });
    for (const hero of heroes) {
      hero.powers = hero.powers.filter(
        (powerId) => powerId.toString() !== id.toString(),
      );
      await hero.save();
    }
    return 'Power delete';
  }
}
