import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// Update the import path below to the actual location of PaginationDto, for example:
import { PaginationDto } from '../common/dto/pagination.dto';
import { PRODUCTS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}
  
  @Post()
  createProduct() {
    return 'This action adds a new product';
  }
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'This action returns a product';
  }
  @Patch(':id')
  patchProduct(
    @Body() body: any,
    @Param('id') id: string
  ) {
    return 'This action updates a product';
  }
  @Delete(':id')
  removeProduct() {
    return 'This action removes a product';
  }
}
