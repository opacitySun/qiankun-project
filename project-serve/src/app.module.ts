import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleModule } from './example/example.module';
import { PlanModule } from './plan/plan.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my_blog', { useNewUrlParser: true }),
    ExampleModule,
    PlanModule,
    ArticleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
