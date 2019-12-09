import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductsController} from './products.controller';
import { ProductsService } from './products.service';
import { unitSchema } from './product.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Unit', schema: unitSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
