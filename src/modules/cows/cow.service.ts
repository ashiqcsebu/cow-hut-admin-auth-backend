import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import Cow from './cow.model';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';

const createCow = async (user: ICow): Promise<ICow | null> => {
  const newCow = new Cow(user);
  const createdCow = await newCow.save();
  return createdCow;
};

// get all cows by pagination
const getAllCowsByPagination = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => {
        const condition: Record<string, unknown> = {};

        if (field === 'price' || field === 'age') {
          const numericValue = parseInt(searchTerm);
          if (!isNaN(numericValue)) {
            condition[field] = numericValue;
          }
        } else {
          condition[field] = {
            $regex: searchTerm,
            $options: 'i',
          };
        }

        return condition;
      }),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'minPrice') {
          return {
            price: { $gte: parseInt(String(value), 10) },
          };
        } else if (field === 'maxPrice') {
          return {
            price: { $lte: parseInt(String(value), 10) },
          };
        } else {
          return {
            [field]: { $regex: value, $options: 'i' },
          };
        }
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get all cows
const getCows = async (): Promise<ICow[]> => {
  const cows = await Cow.find({}).populate('seller').sort({ _id: -1 });
  return cows;
};

// get single Cow
const getSingleCowById = async (id: string): Promise<ICow | null> => {
  const cow = await Cow.findOne({ _id: id }).populate('seller');
  return cow;
};

// update cow info
const updateCowById = async (
  id: string,
  updateData: object
): Promise<ICow | null> => {
  const cow = await Cow.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return cow;
};

// delete cow
const deleteCowById = async (id: string): Promise<ICow | null> => {
  const cow = await Cow.findByIdAndDelete({ _id: id });
  return cow;
};

export const CowService = {
  createCow,
  getAllCowsByPagination,
  getCows,
  getSingleCowById,
  updateCowById,
  deleteCowById,
};
