import { model, Schema } from 'mongoose';
import {
  cowBreeds,
  cowCategories,
  cowLabels,
  cowLocations,
} from './cow.constant';
import { CowModel, ICow } from './cow.interface';

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: cowLocations,
      required: true,
    },
    breed: {
      type: String,
      enum: cowBreeds,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      enum: cowLabels,
      default: 'for sale',
      required: true,
    },
    category: {
      type: String,
      enum: cowCategories,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cow = model<ICow, CowModel>('Cow', cowSchema);
export default Cow;
