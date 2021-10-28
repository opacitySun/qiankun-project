import { Document } from 'mongoose';

export interface Data extends Document {
  title: string;
  desc: string;
  article: string;
  time: number;
}