import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RmqContext, RpcException } from '@nestjs/microservices';
// Update the import path below to the actual location of PaginationDto, for example:
import { PaginationDto } from '../common/dto/pagination.dto';
import { PRODUCTS_SERVICE } from 'src/config';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}
  
  @Post()
  createProduct(@Body() createProductDto : CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto).pipe(
      catchError((error) => { throw new RpcException(error); })
    );
  }
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsClient.send({ cmd: 'find_one_product' }, {id})
    .pipe(
      catchError((error) => { throw new RpcException(error); })
    );
    
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, {id})
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error) 
    // }
   
  }
  @Delete(':id')
  removeProduct() {
    return 'This action removes a product';
  }
  
  @Patch(':id')
  patchProduct(
    @Body() body: any,
    @Param('id') id: string
  ) {
    return 'This action updates a product';
  }
}
