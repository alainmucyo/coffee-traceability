import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeShipmentService } from './coffee-shipment.service';

describe('CoffeeShipmentService', () => {
  let service: CoffeeShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeShipmentService],
    }).compile();

    service = module.get<CoffeeShipmentService>(CoffeeShipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
