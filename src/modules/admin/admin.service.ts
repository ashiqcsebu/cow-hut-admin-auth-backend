/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { IAdmin, ILoginAdmin } from './admin.interface';
import { Admin } from './admin.model';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import {  ILoginUserResponse, IRefreshTokenResponse } from '../auths/auth.interface';
import ApiError from '../../errors/ApiError';
import bcrypt from 'bcrypt';

const createAdmin = async (user:IAdmin) => {
  const admin = new Admin(user); // Create an instance of the Admin model
  const result = await admin.save(); // Save the instance to the database
  return result.toObject();
};



const adminLogin = async (payload: ILoginAdmin): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isUserExist = await Admin.findOne({phoneNumber:phoneNumber});
  if (!isUserExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await Admin.findById({_id:userId});
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};


export const AdminService = {
  createAdmin,
  adminLogin,
  refreshToken
};


