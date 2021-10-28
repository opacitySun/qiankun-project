import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSchema } from './schemas/data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'db_blog_plan', schema: DataSchema }])
  ],
  providers: [PlanService],
  controllers: [PlanController]
})
export class PlanModule {}
