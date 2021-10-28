import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Example } from './interfaces/example.interface';
import { CreateExampleDTO } from './dto/create-example.dto';

@Injectable()
export class ExampleService {
  constructor(@InjectModel('db_blog_example') private readonly dataModel: Model<Example>) {
  }

  async getExamples(): Promise<Example[]> {
    const examples = await this.dataModel.find().exec();
    return examples;
  }

  async getExample(id): Promise<Example> {
    const example = await this.dataModel.findById(id).exec();
    return example;
  }

  async addExample(createExampleDTO: CreateExampleDTO): Promise<Example> {
    const newExample = await this.dataModel.create(createExampleDTO);
    return newExample.save();
  }

  async editExample(id, CreateExampleDTO: CreateExampleDTO): Promise<Example> {
    const editedExample = await this.dataModel
      .findByIdAndUpdate(id, CreateExampleDTO, { new: true });
    return editedExample;
  }

  async deleteExample(id): Promise<any> {
    const deletedExample = await this.dataModel.findByIdAndRemove(id);
    return deletedExample;
  }
}
