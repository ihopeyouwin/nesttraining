import { Injectable, NotFoundException } from '@nestjs/common';
import { Unit } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Unit') private readonly unitModel: Model<Unit>) {
  }

  async insertUnit(title: string, desc: string, price: number) {
    const newUnit = new this.unitModel({ title, description: desc, price });
    const result = await newUnit.save();
    return result.id;
  }

  async getUnits() {
    const units = await this.unitModel.find().exec();
    return units.map((unit) => ({
      id: unit.id,
      title: unit.title,
      description: unit.description,
      price: unit.price,
    }));
  }

  async getSingleUnit(unitId: string) {
    const unit = await this.findUnit(unitId);
    return {
      id: unit.id,
      title: unit.title,
      description: unit.description,
      price: unit.price,
    };
  }

  async updateUnit(unitId: string, title: string, desc: string, price: number) {
    const updatedUnit = await this.findUnit(unitId);
    if (title) {
      updatedUnit.title = title;
    }
    if (desc) {
      updatedUnit.description = desc;
    }
    if (price) {
      updatedUnit.price = price;
    }
    updatedUnit.save();
  }

  async deleteUnit(unitId: string) {
    let result;
    try {
      result = await this.unitModel.deleteOne({_id: unitId}).exec();
    } catch {
      throw new NotFoundException('Could not find a product.');
    }
    if (result.n === 0) {
      throw new NotFoundException('Could not find a product.');
    }
  }

  private async findUnit(id: string): Promise<Unit> {
    let unit;
    try {
      unit = await this.unitModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find a product.');
    }
    if (!unit) {
      throw new NotFoundException('Could not find a product.');
    }
    return unit;
  }
}
