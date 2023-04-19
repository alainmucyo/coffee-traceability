import { Module } from '@nestjs/common';
import { CoffeeShipmentsController } from './coffee-shipment.controller';
import { CoffeeShipmentsService } from './coffee-shipment.service';

@Module({
  controllers: [CoffeeShipmentsController],
  providers: [CoffeeShipmentsService],
})
export class CoffeeShipmentModule {}
