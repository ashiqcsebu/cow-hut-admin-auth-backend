import { RequestHandler } from 'express';
import { UserService } from './users.service';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getSingleUserById(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update user info
const updateUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.updateUserById(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete user
const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.deleteUserById(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUserInfo,
  deleteUser,
};
