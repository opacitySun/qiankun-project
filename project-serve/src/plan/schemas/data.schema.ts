import * as mongoose from 'mongoose';

export const DataSchema = new mongoose.Schema({
  title: String,
  desc: String,
  article: String,
  time: Number
})