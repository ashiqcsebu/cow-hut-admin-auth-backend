import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { CowService } from './cow.service';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { cowFilterableFields } from './cow.constant';
import { paginationFields } from '../../constants/pagination';
import { ICow } from './cow.interface';

const createCow: RequestHandler = async (req, res, next) => {
  try {
    const result = await CowService.createCow(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get cows by pagination
const getCowsByDynamic: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, cowFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowService.getAllCowsByPagination(
      filters,
      paginationOptions
    );

    sendResponse<ICow[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

// get all cows
const getAllCows: RequestHandler = async (req, res, next) => {
  try {
    const result = await CowService.getCows();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cows retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get single cow
const getSingleCow: RequestHandler = async (req, res, next) => {
  try {
    const result = await CowService.getSingleCowById(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update user info
const updateCowInfo: RequestHandler = async (req, res, next) => {
  try {
    const result = await CowService.updateCowById(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete user
const deleteCow: RequestHandler = async (req, res, next) => {
  try {
    const result = await CowService.deleteCowById(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Cow deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  createCow,
  getCowsByDynamic,
  getAllCows,
  getSingleCow,
  updateCowInfo,
  deleteCow,
};
