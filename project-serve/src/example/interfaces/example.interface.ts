import { Document } from 'mongoose';

export interface Example extends Document {
  readonly title: string;
  readonly imgSrc: string;
  readonly time: number;
}