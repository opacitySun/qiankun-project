import * as mongoose from 'mongoose';

//schema是用来定义表存储的数据结构和类型的蓝图
export const ExampleSchema = new mongoose.Schema({
  title: String,
  imgSrc: String,
  time: Number
})