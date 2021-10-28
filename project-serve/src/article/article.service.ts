import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Data } from './interfaces/data.interface';
import { CreateDataDTO } from './dto/create-data.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel('db_blog_article') private readonly dataModel: Model<Data>) {
  }

  async getDatas(): Promise<Data[]> {
    const datas = await this.dataModel.find().exec();
    return datas;
  }

  async getData(id): Promise<Data> {
    const data = await this.dataModel.findById(id).exec();
    return data;
  }

  async addData(createDataDTO: CreateDataDTO): Promise<Data> {
    const newData = await this.dataModel.create(createDataDTO);
    return newData.save();
  }

  async editData(id, createDataDTO: CreateDataDTO): Promise<Data> {
    const editedData = await this.dataModel
      .findByIdAndUpdate(id, createDataDTO, { new: true });
    return editedData;
  }

  async deleteData(id): Promise<any> {
    const deletedData = await this.dataModel.findByIdAndRemove(id);
    return deletedData;
  }
}
