import { Test, TestingModule } from '@nestjs/testing';
import { BiddingGateway } from './bidding.gateway';

describe('BiddingGateway', () => {
  let gateway: BiddingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiddingGateway],
    }).compile();

    gateway = module.get<BiddingGateway>(BiddingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
