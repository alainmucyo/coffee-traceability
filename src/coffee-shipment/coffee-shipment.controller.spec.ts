import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeShipmentController } from './coffee-shipment.controller';
import { CoffeeShipmentService } from './coffee-shipment.service';

describe('CoffeeShipmentController', () => {
  let controller: CoffeeShipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeShipmentController],
      providers: [CoffeeShipmentService],
    }).compile();

    controller = module.get<CoffeeShipmentController>(CoffeeShipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
