import { NextFunction, Request, RequestHandler, Response } from 'express';
import { authService } from './auth.service';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../config';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser =async (req: Request, res: Response,next:NextFunction) => {
  try {
  const { ...loginData } = req.body;
  const result = await authService.authLogin(loginData);
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
  const result = await authService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
  } catch (error) {
    next(error)
  }
};

export const authController = {
  createUser,
  loginUser,
  refreshToken
};
