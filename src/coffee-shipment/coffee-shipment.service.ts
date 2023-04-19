import { BadRequestException, Injectable } from '@nestjs/common';

import { FindManyOptions } from 'typeorm';
import { CoffeeShipment } from './entities/coffee-shipment.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CoffeeShipmentsService {
  async create(shipment: Partial<CoffeeShipment>) {
    const newShipment = CoffeeShipment.create(shipment);
    return newShipment.save();
  }

  async findAll(): Promise<CoffeeShipment[]> {
    return CoffeeShipment.find();
  }

  async findOne(id: number): Promise<CoffeeShipment> {
    return CoffeeShipment.findOne({ where: { id } });
  }

  async update(
    id: number,
    shipment: Partial<CoffeeShipment>,
  ): Promise<CoffeeShipment> {
    const existingShipment = await CoffeeShipment.findOne({ where: { id } });
    if (!existingShipment) {
      throw new Error('CoffeeShipment not found');
    }
    Object.assign(existingShipment, shipment);
    return existingShipment.save();
  }

  async delete(id: number): Promise<void> {
    await CoffeeShipment.delete(id);
  }

  async updateHolderAndStatus(
    id: number,
    holderId: number,
    status: string,
  ): Promise<CoffeeShipment> {
    const shipment = await CoffeeShipment.findOne({
      where: { id },
      relations: ['currentHolder'],
    });
    if (!shipment) {
      throw new BadRequestException('CoffeeShipment not found');
    }

    const holder = await User.findOne({ where: { id: holderId } });
    if (!holder) {
      throw new BadRequestException('Holder not found');
    }

    shipment.currentHolderId = holderId;
    shipment.status = status;
    return shipment.save();
  }

  async search(
    options: FindManyOptions<CoffeeShipment>,
  ): Promise<CoffeeShipment[]> {
    return CoffeeShipment.find(options);
  }
}
