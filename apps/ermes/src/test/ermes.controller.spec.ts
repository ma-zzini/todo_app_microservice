import { Test, TestingModule } from '@nestjs/testing';
import { ErmesController } from '../ermes.controller';
import { ErmesService } from '../ermes.service';

describe('ErmesController', () => {
  let ermesController: ErmesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ErmesController],
      providers: [ErmesService],
    }).compile();

    ermesController = app.get<ErmesController>(ErmesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ermesController.getHello()).toBe('Hello World!');
    });
  });
});
