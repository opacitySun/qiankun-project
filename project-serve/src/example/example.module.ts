import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleSchema } from './schemas/example.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'db_blog_example', schema: ExampleSchema }])
  ],
  providers: [ExampleService],
  controllers: [ExampleController]
})
export class ExampleModule {}
