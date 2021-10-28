import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSchema } from './schemas/data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'db_blog_article', schema: DataSchema }])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
