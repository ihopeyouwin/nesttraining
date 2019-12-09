import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Post()
  async addUnit(@Body('title') unitTitle: string,
                @Body('description') unitDesc: string,
                @Body('price') unitPrice: number) {

    const generatedId = await this.productsService.insertUnit(
      unitTitle,
      unitDesc,
      unitPrice);
    return { id: generatedId };
  }

  @Get()
  async getAllUnits() {
    return await this.productsService.getUnits();
  }

  @Get(':id')
  getUnit(@Param('id') unitId: string) {
    return this.productsService.getSingleUnit(unitId);
  }

  @Patch(':id')
  async updateUnit(@Param('id') unitId: string,
                   @Body('title') unitTitle: string,
                   @Body('description') unitDesc: string,
                   @Body('price') unitPrice: number) {
    await this.productsService.updateUnit(unitId, unitTitle, unitDesc, unitPrice);
    return null;
  }

  @Delete(':id')
  async removeUnit(@Param('id') unitId: string) {
    await this.productsService.deleteUnit(unitId);
    return null;
  }
}
