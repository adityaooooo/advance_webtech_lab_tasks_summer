import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
  ILike,
} from 'typeorm';

import { Products } from './entities/products.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';


@Injectable()
export class ProductsService {


  constructor(

    @InjectRepository(Products)

    private productsRepo: Repository<Products>,

  ) {}



  // CREATE PRODUCT

  async create(dto: CreateProductDto) {

    const product =
      this.productsRepo.create(dto);


    const savedProduct =
      await this.productsRepo.save(product);


    return {

      message: 'Product created successfully',

      data: savedProduct,

    };

  }




  // GET ALL PRODUCTS

  async findAll() {

    const products =
      await this.productsRepo.find({

        order: {
          createdAt: 'DESC',
        },

      });


    return {

      message: 'Products fetched successfully',

      count: products.length,

      data: products,

    };

  }




  // GET PRODUCT BY ID

  async findOne(id: number) {


    const product =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    if (!product) {

      throw new NotFoundException(
        `Product with id ${id} not found`,
      );

    }



    return {

      message: 'Product fetched successfully',

      data: product,

    };

  }





  // PATCH UPDATE

  async update(
    id: number,
    dto: PartialUpdateProductDto,
  ) {


    const product =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    if (!product) {

      throw new NotFoundException(
        `Product with id ${id} not found`,
      );

    }



    await this.productsRepo.update(
      id,
      dto,
    );


    const updatedProduct =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    return {

      message: 'Product updated successfully',

      data: updatedProduct,

    };

  }





  // PUT FULL REPLACEMENT

  async replace(
    id: number,
    dto: UpdateProductDto,
  ) {


    const product =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    if (!product) {

      throw new NotFoundException(
        `Product with id ${id} not found`,
      );

    }



    await this.productsRepo.update(
      id,
      dto,
    );



    const updatedProduct =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    return {

      message: 'Product replaced successfully',

      data: updatedProduct,

    };

  }





  // DELETE PRODUCT

  async remove(id: number) {


    const product =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    if (!product) {

      throw new NotFoundException(
        `Product with id ${id} not found`,
      );

    }



    await this.productsRepo.delete(id);



    return {

      message: 'Product deleted successfully',

      id,

    };

  }





  // FILTER BY CATEGORY

  async findByCategory(category: string) {


    const products =
      await this.productsRepo.find({

        where: {
          category,
        },

      });



    return {

      message:
        'Products filtered by category',

      count: products.length,

      data: products,

    };

  }





  // SEARCH BY NAME

  async search(keyword: string) {


    const products =
      await this.productsRepo.find({

        where: {

          name: ILike(
            `%${keyword}%`,
          ),

        },

      });



    return {

      message:
        'Search results',

      count: products.length,

      data: products,

    };

  }





  // TOGGLE ACTIVE STATUS

  async toggleActive(id: number) {


    const product =
      await this.productsRepo.findOne({

        where: {
          id,
        },

      });



    if (!product) {

      throw new NotFoundException(
        `Product with id ${id} not found`,
      );

    }



    product.isActive =
      !product.isActive;



    const updatedProduct =
      await this.productsRepo.save(product);



    return {

      message:
        'Product status updated',

      data: updatedProduct,

    };

  }


}