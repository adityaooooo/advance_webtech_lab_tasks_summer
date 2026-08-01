import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';


import { ProductsService } from './products.service';


import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductDto } from './dto/update-product.dto';

import { PartialUpdateProductDto } from './dto/partial-update-product.dto';



@Controller('products')
export class ProductsController {


  constructor(
    private readonly productsService: ProductsService,
  ) {}



  // CREATE PRODUCT

  @Post()
  create(
    @Body() dto: CreateProductDto,
  ) {

    return this.productsService.create(dto);

  }





  // GET ALL PRODUCTS

  @Get()
  findAll() {

    return this.productsService.findAll();

  }





  // SEARCH
  // IMPORTANT: Keep before :id

  @Get('search')
  search(
    @Query('keyword') keyword: string,
  ) {

    return this.productsService.search(keyword);

  }





  // CATEGORY FILTER
  // IMPORTANT: Keep before :id

  @Get('category/:cat')
  findByCategory(
    @Param('cat') cat: string,
  ) {

    return this.productsService.findByCategory(cat);

  }





  // GET ONE PRODUCT

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {

    return this.productsService.findOne(id);

  }





  // PATCH UPDATE

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,

    @Body() dto: PartialUpdateProductDto,

  ) {

    return this.productsService.update(
      id,
      dto,
    );

  }





  // PUT REPLACE

  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,

    @Body() dto: UpdateProductDto,

  ) {

    return this.productsService.replace(
      id,
      dto,
    );

  }





  // DELETE

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,

  ) {

    return this.productsService.remove(id);

  }





  // TOGGLE ACTIVE

  @Patch(':id/toggle')
  toggleActive(
    @Param('id', ParseIntPipe) id: number,

  ) {

    return this.productsService.toggleActive(id);

  }


}