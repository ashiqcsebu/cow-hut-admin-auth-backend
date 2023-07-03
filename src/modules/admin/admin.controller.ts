import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';
import sendResponse from '../../shared/sendResponse';
import config from '../../config';
import { ILoginUserResponse, IRefreshTokenResponse } from '../auths/auth.interface';


const createAdmin: RequestHandler =async (req, res, next)=>{
  try {
      const result = await AdminService.createAdmin(req.body);
      const responseData = {
      phoneNumber: result.phoneNumber,
      role: result.role,
      name: result.name,
      address: result.address,
      _id: result._id
    };
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: responseData,
    });
  } catch (error) {
    next(error);
  }
}


const loginAdmin =async (req: Request, res: Response,next:NextFunction) => {
  try {
  const { ...loginData } = req.body;
  const result = await AdminService.adminLogin(loginData);
  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
  } catch (error) {
    next(error)
  }
};

const refreshToken = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
  const result = await AdminService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
  } catch (error) {
    next(error)
  }
};



export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken

};
