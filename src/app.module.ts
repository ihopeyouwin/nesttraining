import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(
    'mongodb+srv://kerri:bobo_20@benderrodriguez-4dfbh.mongodb.net/SC2DB?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
