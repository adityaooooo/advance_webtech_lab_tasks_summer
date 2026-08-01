import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { CreateProductDto } from './create-product.dto';


export class UpdateProductDto extends CreateProductDto {}
import { PartialType } from '@nestjs/mapped-types';

import { CreateProductDto } from './create-product.dto';

export class PartialUpdateProductDto extends PartialType(
  CreateProductDto,
) {}
describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
